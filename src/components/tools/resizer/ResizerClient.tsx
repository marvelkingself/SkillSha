'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ResizedItem,
  ResizeSettings,
  ResizeMode,
} from '@/types/resizer';
import ResizerDropzone from './ResizerDropzone';
import ResizerControls from './ResizerControls';
import ResizedItemList from './ResizedItemList';
import {
  resizeImageInBrowser,
  getImageNaturalDimensions,
} from '@/lib/tools/resizer/browser-resizer';

export default function ResizerClient() {
  const [items, setItems] = useState<ResizedItem[]>([]);
  const [baseWidth, setBaseWidth] = useState<number>(1200);
  const [baseHeight, setBaseHeight] = useState<number>(630);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [settings, setSettings] = useState<ResizeSettings>({
    mode: 'dimensions',
    width: 1200,
    height: 630,
    percentage: 50,
    lockAspectRatio: true,
    fit: 'cover',
    backgroundColor: '#FFFFFF',
    format: 'original',
    quality: 90,
  });

  // Track active object URLs for lifecycle cleanup
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

  // Cleanup all object URLs when unmounting
  useEffect(() => {
    return () => {
      blobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      blobUrlsRef.current.clear();
    };
  }, []);

  // Core resize queue processor
  const runResizeQueue = useCallback(
    async (itemsToProcess: ResizedItem[], currentSettings: ResizeSettings) => {
      if (itemsToProcess.length === 0) return;
      setIsProcessing(true);

      const updated = await Promise.all(
        itemsToProcess.map(async (item) => {
          try {
            const res = await resizeImageInBrowser(item.originalFile, currentSettings);
            const resizedUrl = registerBlobUrl(URL.createObjectURL(res.blob));

            cleanupBlobUrl(item.resizedPreviewUrl);

            return {
              ...item,
              resizedBlob: res.blob,
              resizedSize: res.size,
              resizedWidth: res.width,
              resizedHeight: res.height,
              resizedPreviewUrl: resizedUrl,
              outputFormat: res.outputFormat,
              status: 'done' as const,
              errorMsg: undefined,
            };
          } catch (err: unknown) {
            const errorMsg =
              err instanceof Error ? err.message : 'Resizing failed for this image.';
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

  // Handle file uploads from dropzone
  const handleFilesSelected = async (files: File[]) => {
    setIsProcessing(true);

    const newItemsWithMeta: ResizedItem[] = await Promise.all(
      files.map(async (file) => {
        const origUrl = registerBlobUrl(URL.createObjectURL(file));
        let naturalW = 1200;
        let naturalH = 630;

        try {
          const dims = await getImageNaturalDimensions(file);
          naturalW = dims.width;
          naturalH = dims.height;
        } catch {
          // fallback to defaults if dimension reading fails
        }

        return {
          id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          originalFile: file,
          originalName: file.name,
          originalSize: file.size,
          originalWidth: naturalW,
          originalHeight: naturalH,
          originalPreviewUrl: origUrl,
          resizedBlob: null,
          resizedSize: 0,
          resizedWidth: 0,
          resizedHeight: 0,
          resizedPreviewUrl: null,
          outputFormat: file.type.replace('image/', ''),
          status: 'processing' as const,
        };
      })
    );

    // If this is the initial upload, set base dimensions from the first image
    let activeSettings = settings;
    if (items.length === 0 && newItemsWithMeta.length > 0) {
      const first = newItemsWithMeta[0];
      setBaseWidth(first.originalWidth);
      setBaseHeight(first.originalHeight);

      // If user hasn't selected a specific preset or percentage, update custom width/height to original
      if (settings.mode === 'dimensions' && !settings.selectedPresetId) {
        activeSettings = {
          ...settings,
          width: first.originalWidth,
          height: first.originalHeight,
        };
        setSettings(activeSettings);
      }
    }

    const combinedList = [...items, ...newItemsWithMeta];
    setItems(combinedList);

    await runResizeQueue(combinedList, activeSettings);
  };

  // Re-process when settings change (debounced)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSettingsChange = (newSettings: Partial<ResizeSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);

    if (items.length > 0) {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => {
        setItems((prev) =>
          prev.map((item) => ({ ...item, status: 'processing' as const }))
        );
        runResizeQueue(items, updatedSettings);
      }, 350);
    }
  };

  // Remove single image
  const handleRemoveItem = (id: string) => {
    setItems((prev) => {
      const itemToRemove = prev.find((i) => i.id === id);
      if (itemToRemove) {
        cleanupBlobUrl(itemToRemove.originalPreviewUrl);
        cleanupBlobUrl(itemToRemove.resizedPreviewUrl);
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  // Clear all images
  const handleClearAll = () => {
    items.forEach((item) => {
      cleanupBlobUrl(item.originalPreviewUrl);
      cleanupBlobUrl(item.resizedPreviewUrl);
    });
    setItems([]);
  };

  return (
    <div className="space-y-8">
      {/* Upload Dropzone */}
      <ResizerDropzone
        onFilesSelected={handleFilesSelected}
        disabled={isProcessing}
      />

      {/* Resize Options & Controls */}
      <ResizerControls
        settings={settings}
        onSettingsChange={handleSettingsChange}
        disabled={isProcessing}
        baseWidth={baseWidth}
        baseHeight={baseHeight}
      />

      {/* Processed Results & Batch Actions */}
      <ResizedItemList
        items={items}
        onRemoveItem={handleRemoveItem}
        onClearAll={handleClearAll}
        disabled={isProcessing}
      />
    </div>
  );
}
