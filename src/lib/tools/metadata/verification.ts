/**
 * Metadata Verification Pipeline
 * Performs a rigorous secondary scan on the processed image buffer and compares
 * Before vs. After results to ensure 100% audit truthfulness.
 */

import {
  MetadataScanResult,
  FieldComparison,
  VerificationReport,
  CleaningMode,
  TagRemovalStatus,
} from '@/types/tools';
import { scanImageMetadata } from './scanner';

export async function verifyAndCompare(
  beforeScan: MetadataScanResult,
  cleanedBuffer: Buffer,
  modeUsed: CleaningMode,
  originalSizeBytes: number
): Promise<{
  afterScan: MetadataScanResult;
  verification: VerificationReport;
}> {
  // 1. Mandatory Second Scan
  const afterScan = await scanImageMetadata(cleanedBuffer);

  // 2. Category by Category Comparison
  const comparisons: FieldComparison[] = [];

  // Helper comparator
  const evaluateCategory = (
    categoryName: 'EXIF' | 'GPS' | 'XMP' | 'IPTC' | 'C2PA' | 'AI Metadata',
    wasDetectedBefore: boolean,
    isDetectedAfter: boolean,
    removalSupported: boolean = true
  ): FieldComparison => {
    let before: 'Found' | 'Not Found' = wasDetectedBefore ? 'Found' : 'Not Found';
    let after: 'Present' | 'Absent' = isDetectedAfter ? 'Present' : 'Absent';
    let status: TagRemovalStatus;
    let notes: string | undefined;

    if (!wasDetectedBefore) {
      status = 'Not Found';
      notes = 'No tags were present in original image';
    } else if (!isDetectedAfter) {
      status = 'Removed';
      notes = 'Verified absent in post-cleaning scan';
    } else {
      if (!removalSupported) {
        status = 'Unsupported';
        notes = 'Format does not support safe removal of this metadata type';
      } else {
        status = 'Could not remove';
        notes = 'Metadata residual was still detected after cleaning';
      }
    }

    return {
      category: categoryName,
      before,
      after,
      status,
      notes,
    };
  };

  // Evaluate EXIF
  comparisons.push(evaluateCategory('EXIF', beforeScan.exif.detected, afterScan.exif.detected));

  // Evaluate GPS
  comparisons.push(evaluateCategory('GPS', beforeScan.gps.detected, afterScan.gps.detected));

  // Evaluate XMP
  comparisons.push(evaluateCategory('XMP', beforeScan.xmp.detected, afterScan.xmp.detected));

  // Evaluate IPTC
  comparisons.push(evaluateCategory('IPTC', beforeScan.iptc.detected, afterScan.iptc.detected));

  // Evaluate C2PA
  comparisons.push(
    evaluateCategory(
      'C2PA',
      beforeScan.c2pa.detected,
      afterScan.c2pa.detected,
      beforeScan.c2pa.removalSupported
    )
  );

  // Evaluate AI Metadata
  comparisons.push(
    evaluateCategory('AI Metadata', beforeScan.aiMetadata.detected, afterScan.aiMetadata.detected)
  );

  const cleanedSizeBytes = cleanedBuffer.length;
  const sizeSavingsBytes = Math.max(0, originalSizeBytes - cleanedSizeBytes);
  const sizeSavingsPercent =
    originalSizeBytes > 0 ? Math.round((sizeSavingsBytes / originalSizeBytes) * 100) : 0;

  const allCleanedSuccessfully = comparisons.every((c) => {
    if (c.before === 'Found') {
      return c.status === 'Removed';
    }
    return true;
  });

  const verification: VerificationReport = {
    timestamp: new Date().toISOString(),
    originalSizeBytes,
    cleanedSizeBytes,
    sizeSavingsBytes,
    sizeSavingsPercent,
    modeUsed,
    comparisons,
    allCleanedSuccessfully,
  };

  return {
    afterScan,
    verification,
  };
}
