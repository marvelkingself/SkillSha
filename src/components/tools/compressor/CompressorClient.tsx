'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  CompressedItem,
  CompressionPreset,
  CompressionSettings,
} from '@/types/compressor';
import CompressorDropzone from './CompressorDropzone';
import CompressionControls from './CompressionControls';
import CompressedItemList from './CompressedItemList';
import {
  compressImageInBrowser,
  downloadBlob,
} from '@/lib/tools/compressor/browser-compressor';
import { RefreshCw, Zap } from 'lucide-react';

export default function CompressorClient() {
  const [items, setItems] = useState<CompressedItem[]>([]);
  const [preset, setPreset] = useState<CompressionPreset>('balanced');
  const [settings, setSettings] = useState<CompressionSettings>({
    quality: 75,
    format: 'webp',
    maxWidth: 0,
  });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // References to keep track of active blob URLs for clean disposal
  const blobUrlsRef = useRef<Set<string>>(new Set());

  const registerBlobUrl = useCallback((url: string) => {
    blobUrlsRef.current.add(url);
    return url;
  }, []);

  const cleanupBlobUrl = useCallback((url: string | null) => {
    if (url && blobUrlsRef.current.has(url)) {
      URL.revokeObjectURL(url);
      blobUrlsRef.current.delete(url);
    }
  }, []);

  // Cleanup all blob URLs on unmount
  useEffect(() => {
    return () => {
      blobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      blobUrlsRef.current.clear();
    };
  }, []);

  // Core compression runner for a list of items
  const runCompressionQueue = useCallback(
    async (itemsToProcess: CompressedItem[], currentSettings: CompressionSettings) => {
      setIsProcessing(true);

      const updated = await Promise.all(
        itemsToProcess.map(async (item) => {
          try {
            const res = await compressImageInBrowser(item.originalFile, currentSettings);
            const compressedUrl = registerBlobUrl(URL.createObjectURL(res.blob));

            // Clean previous compressed URL if existed
            cleanupBlobUrl(item.compressedPreviewUrl);

            return {
              ...item,
              compressedBlob: res.blob,
              compressedSize: res.size,
              savingsBytes: res.savingsBytes,
              savingsPercent: res.savingsPercent,
              compressedPreviewUrl: compressedUrl,
              width: res.width,
              height: res.height,
              outputFormat: res.outputFormat,
              status: 'done' as const,
              errorMsg: undefined,
            };
          } catch (err: unknown) {
            const errorMsg =
              err instanceof Error ? err.message : 'Compression failed for this image.';
            return {
              ...item,
              status: 'error' as const,
              errorMsg,
            };
          }
        })
      );

      setItems(updated);
      setIsProcessing(false);
    },
    [registerBlobUrl, cleanupBlobUrl]
  );

  // Handle incoming files from dropzone
  const handleFilesSelected = async (files: File[]) => {
    const newItems: CompressedItem[] = files.map((file) => {
      const origUrl = registerBlobUrl(URL.createObjectURL(file));
      return {
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        originalFile: file,
        originalName: file.name,
        originalSize: file.size,
        compressedBlob: null,
        compressedSize: file.size,
        savingsBytes: 0,
        savingsPercent: 0,
        originalPreviewUrl: origUrl,
        compressedPreviewUrl: null,
        width: 0,
        height: 0,
        outputFormat: file.type,
        status: 'compressing',
      };
    });

    const combinedList = [...items, ...newItems];
    setItems(combinedList);

    // Compress newly added items
    await runCompressionQueue(combinedList, settings);
  };

  // Re-compress when settings change (debounced for sliders)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSettingsChange = (newSettings: Partial<CompressionSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);

    if (items.length > 0) {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => {
        // Mark items compressing
        setItems((prev) =>
          prev.map((i) => ({ ...i, status: 'compressing' as const }))
        );
        runCompressionQueue(items, updatedSettings);
      }, 350);
    }
  };

  // Remove single item
  const handleRemoveItem = (id: string) => {
    setItems((prev) => {
      const itemToRemove = prev.find((i) => i.id === id);
      if (itemToRemove) {
        cleanupBlobUrl(itemToRemove.originalPreviewUrl);
        cleanupBlobUrl(itemToRemove.compressedPreviewUrl);
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  // Clear all items
  const handleClearAll = () => {
    items.forEach((item) => {
      cleanupBlobUrl(item.originalPreviewUrl);
      cleanupBlobUrl(item.compressedPreviewUrl);
    });
    setItems([]);
  };

  // Batch download all done items
  const handleDownloadAll = () => {
    const doneItems = items.filter((i) => i.status === 'done' && i.compressedBlob);
    doneItems.forEach((item, index) => {
      setTimeout(() => {
        const ext = item.outputFormat.includes('webp')
          ? '.webp'
          : item.outputFormat.includes('png')
          ? '.png'
          : '.jpg';
        const base =
          item.originalName.substring(0, item.originalName.lastIndexOf('.')) ||
          item.originalName;
        downloadBlob(item.compressedBlob!, `${base}-skillsha-optimized${ext}`);
      }, index * 250); // slight stagger for browser download queue
    });
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <CompressorDropzone
        onFilesSelected={handleFilesSelected}
        disabled={isProcessing}
      />

      {/* Controls & Configuration */}
      <CompressionControls
        settings={settings}
        preset={preset}
        onPresetChange={setPreset}
        onSettingsChange={handleSettingsChange}
        disabled={isProcessing}
      />

      {/* Output / Results List */}
      <CompressedItemList
        items={items}
        onRemoveItem={handleRemoveItem}
        onDownloadAll={handleDownloadAll}
        onClearAll={handleClearAll}
        isProcessing={isProcessing}
      />
    </div>
  );
}
