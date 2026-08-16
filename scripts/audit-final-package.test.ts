import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

type FinalAsset = {
  key: string;
  localFile: string | null;
  managedUrl: string;
  status: string;
};

type FinalManifest = {
  package: string;
  assets: FinalAsset[];
  restrictedAssets: string[];
};

const packageRoot = process.env.SEG_FINAL_PACKAGE_ROOT ?? path.resolve(process.cwd(), '..', 'webdev-static-assets', 'SEG_FINAL_PACKAGE');
const manifest = JSON.parse(
  readFileSync(path.join(packageRoot, 'assets_manifest.json'), 'utf8')
) as FinalManifest;

describe('SEG final package asset manifest', () => {
  it('declares the required release-package identity and all managed visual entries', () => {
    expect(manifest.package).toBe('SEG_FINAL_PACKAGE');
    expect(manifest.assets).toHaveLength(21);
    expect(manifest.assets.every((asset) => asset.key && asset.managedUrl.startsWith('/manus-storage/'))).toBe(true);
  });

  it('includes every approved local source copy and preserves the Medical Journal restriction', () => {
    const localAssets = manifest.assets.filter((asset) => asset.localFile);
    expect(localAssets).toHaveLength(9);
    expect(localAssets.every((asset) => existsSync(path.join(packageRoot, asset.localFile!)))).toBe(true);
    expect(manifest.restrictedAssets).toContain('medicalJournal');
    expect(manifest.assets.find((asset) => asset.key === 'medicalJournal')?.status).toBe('REFERENCE_ONLY');
  });
});
