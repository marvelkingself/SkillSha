'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  generateQrCode,
  renderQrToCanvas,
  renderQrToSvg,
  downloadQrSvg,
  downloadCanvasAsPng,
  QrErrorCorrectionLevel,
} from '@/lib/tools/qr/qr-engine';
import {
  Link2,
  Wifi,
  User,
  FileText,
  Mail,
  MessageSquare,
  Download,
  Copy,
  Check,
  Sparkles,
  Sliders,
  Palette,
  Image as ImageIcon,
  ShieldCheck,
  Eye,
} from 'lucide-react';

type QrType = 'url' | 'wifi' | 'contact' | 'text' | 'email' | 'sms';

export default function QrClient() {
  const [activeType, setActiveType] = useState<QrType>('url');

  // Input states
  const [url, setUrl] = useState('https://skillsha.com');
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiEncryption, setWifiEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [wifiHidden, setWifiHidden] = useState(false);

  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactOrg, setContactOrg] = useState('');

  const [plainText, setPlainText] = useState('Welcome to Skillsha Free Tools!');

  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const [smsPhone, setSmsPhone] = useState('');
  const [smsMessage, setSmsMessage] = useState('');

  // Styling & Config
  const [ecc, setEcc] = useState<QrErrorCorrectionLevel>('M');
  const [fgColor, setFgColor] = useState('#0F172A');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [margin, setMargin] = useState(2);
  const [size, setSize] = useState(480);
  const [logoOption, setLogoOption] = useState<'none' | 'skillsha' | 'custom'>('none');
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);

  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Compute raw string to encode
  const getEncodedContent = useCallback((): string => {
    switch (activeType) {
      case 'url':
        return url.trim() || 'https://skillsha.com';
      case 'wifi': {
        const ssid = wifiSsid.trim() || 'MyNetwork';
        const type = wifiEncryption;
        const pass = wifiPassword;
        const hidden = wifiHidden ? 'H:true;' : '';
        return `WIFI:S:${ssid};T:${type};P:${pass};${hidden};`;
      }
      case 'contact': {
        return `BEGIN:VCARD\nVERSION:3.0\nN:${contactName || 'Contact'}\nFN:${contactName || 'Contact'}\nORG:${contactOrg}\nTEL:${contactPhone}\nEMAIL:${contactEmail}\nEND:VCARD`;
      }
      case 'text':
        return plainText.trim() || 'Skillsha';
      case 'email': {
        const query = [];
        if (emailSubject) query.push(`subject=${encodeURIComponent(emailSubject)}`);
        if (emailBody) query.push(`body=${encodeURIComponent(emailBody)}`);
        const qStr = query.length ? `?${query.join('&')}` : '';
        return `mailto:${emailTo.trim()}${qStr}`;
      }
      case 'sms': {
        return `SMSTO:${smsPhone.trim()}:${smsMessage}`;
      }
      default:
        return 'https://skillsha.com';
    }
  }, [
    activeType,
    url,
    wifiSsid,
    wifiPassword,
    wifiEncryption,
    wifiHidden,
    contactName,
    contactPhone,
    contactEmail,
    contactOrg,
    plainText,
    emailTo,
    emailSubject,
    emailBody,
    smsPhone,
    smsMessage,
  ]);

  // Handle custom logo file upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCustomLogoUrl(ev.target?.result as string);
        setLogoOption('custom');
        // When using logo, bump ECC to H for maximum readability
        setEcc('H');
      };
      reader.readAsDataURL(file);
    }
  };

  // Render QR Code
  useEffect(() => {
    if (!canvasRef.current) return;
    setIsGenerating(true);

    try {
      const content = getEncodedContent();
      const effectiveEcc = logoOption !== 'none' ? 'H' : ecc;
      const matrix = generateQrCode(content, effectiveEcc);

      let logoUrl: string | undefined = undefined;
      if (logoOption === 'skillsha') {
        logoUrl = '/files/logo-icon.png';
      } else if (logoOption === 'custom' && customLogoUrl) {
        logoUrl = customLogoUrl;
      }

      renderQrToCanvas(matrix, canvasRef.current, {
        size,
        margin,
        foregroundColor: fgColor,
        backgroundColor: bgColor,
        logoDataUrl: logoUrl,
        logoSizeRatio: 0.22,
      }).finally(() => {
        setIsGenerating(false);
      });
    } catch (err) {
      console.error('QR Render failed:', err);
      setIsGenerating(false);
    }
  }, [getEncodedContent, ecc, fgColor, bgColor, margin, size, logoOption, customLogoUrl]);

  // Download Handlers
  const handleDownloadPng = () => {
    if (canvasRef.current) {
      downloadCanvasAsPng(canvasRef.current, `skillsha-qr-${activeType}.png`);
    }
  };

  const handleDownloadSvg = () => {
    const content = getEncodedContent();
    const effectiveEcc = logoOption !== 'none' ? 'H' : ecc;
    const matrix = generateQrCode(content, effectiveEcc);
    const svgStr = renderQrToSvg(matrix, {
      size,
      margin,
      foregroundColor: fgColor,
      backgroundColor: bgColor,
    });
    downloadQrSvg(svgStr, `skillsha-qr-${activeType}.svg`);
  };

  const handleCopyToClipboard = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }, 'image/png');
    } catch {
      // Fallback
    }
  };

  const COLOR_PALETTES = [
    { label: 'Classic Black', fg: '#000000', bg: '#FFFFFF' },
    { label: 'Midnight Blue', fg: '#0F172A', bg: '#F8FAFC' },
    { label: 'Skillsha Indigo', fg: '#3B82F6', bg: '#FFFFFF' },
    { label: 'Emerald Green', fg: '#065F46', bg: '#F0FDF4' },
    { label: 'Royal Violet', fg: '#6D28D9', bg: '#FAF5FF' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Configuration & Data Inputs (7 Cols) */}
      <div className="lg:col-span-7 space-y-6">
        {/* Type Selector Tabs */}
        <div className="p-1.5 rounded-2xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-white/10 flex flex-wrap gap-1">
          {[
            { id: 'url', label: 'Website URL', icon: Link2 },
            { id: 'wifi', label: 'Wi-Fi Network', icon: Wifi },
            { id: 'contact', label: 'Contact Card', icon: User },
            { id: 'text', label: 'Plain Text', icon: FileText },
            { id: 'email', label: 'Email', icon: Mail },
            { id: 'sms', label: 'SMS Message', icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveType(tab.id as QrType)}
                className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Inputs Form Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">QR Code Content</h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Enter the data to encode. Instant preview updates in real-time.
            </p>
          </div>

          {activeType === 'url' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Target Website URL</label>
              <div className="relative">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/promo"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
              </div>
            </div>
          )}

          {activeType === 'wifi' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Network Name (SSID)</label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  placeholder="Office_Wi-Fi_5G"
                  className="w-full mt-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Password</label>
                  <input
                    type="text"
                    value={wifiPassword}
                    onChange={(e) => setWifiPassword(e.target.value)}
                    placeholder="Enter network password"
                    className="w-full mt-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Security Type</label>
                  <select
                    value={wifiEncryption}
                    onChange={(e) => setWifiEncryption(e.target.value as 'WPA' | 'WEP' | 'nopass')}
                    className="w-full mt-1 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">None (Open Network)</option>
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer pt-1 text-xs text-slate-700 dark:text-zinc-300">
                <input
                  type="checkbox"
                  checked={wifiHidden}
                  onChange={(e) => setWifiHidden(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Hidden Network SSID</span>
              </label>
            </div>
          )}

          {activeType === 'contact' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Full Name</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Organization / Title</label>
                  <input
                    type="text"
                    value={contactOrg}
                    onChange={(e) => setContactOrg(e.target.value)}
                    placeholder="Skillsha AI Institute"
                    className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Phone Number</label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Email Address</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="contact@skillsha.com"
                    className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {activeType === 'text' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Plain Text Message</label>
              <textarea
                rows={3}
                value={plainText}
                onChange={(e) => setPlainText(e.target.value)}
                placeholder="Enter any text message or coupon note"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-white"
              />
            </div>
          )}

          {activeType === 'email' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Recipient Email</label>
                <input
                  type="email"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  placeholder="support@skillsha.com"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Subject</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Inquiry from website"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Message Body</label>
                <textarea
                  rows={2}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Hi Skillsha team, I would like to know..."
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {activeType === 'sms' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Phone Number</label>
                <input
                  type="tel"
                  value={smsPhone}
                  onChange={(e) => setSmsPhone(e.target.value)}
                  placeholder="+919876543210"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Pre-filled SMS Message</label>
                <textarea
                  rows={2}
                  value={smsMessage}
                  onChange={(e) => setSmsMessage(e.target.value)}
                  placeholder="START DEMO"
                  className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-zinc-800 text-sm text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}
        </div>

        {/* Styling, Color & Logo Customizer */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 space-y-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Design & Styling Options</h2>
          </div>

          {/* Color Palettes */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">Quick Palette Presets</label>
            <div className="flex flex-wrap gap-2">
              {COLOR_PALETTES.map((pal) => (
                <button
                  key={pal.label}
                  onClick={() => {
                    setFgColor(pal.fg);
                    setBgColor(pal.bg);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-medium flex items-center gap-2 hover:border-blue-400 transition-colors cursor-pointer"
                >
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-300" style={{ backgroundColor: pal.fg }} />
                  <span className="text-slate-700 dark:text-zinc-300">{pal.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Foreground & Background Color Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-zinc-300 block mb-1">
                Foreground (Dots)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-9 h-9 rounded-xl border border-slate-200 cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-800 text-xs font-mono"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-zinc-300 block mb-1">
                Background (Card)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-9 h-9 rounded-xl border border-slate-200 cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-800 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* Center Logo Embed */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
            <label className="text-xs font-bold text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
              <span>Center Brand Logo</span>
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setLogoOption('none')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  logoOption === 'none'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-white/10'
                }`}
              >
                No Logo
              </button>
              <button
                onClick={() => {
                  setLogoOption('skillsha');
                  setEcc('H');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  logoOption === 'skillsha'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-white/10'
                }`}
              >
                Skillsha Logo
              </button>
              <label
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer inline-flex items-center gap-1 ${
                  logoOption === 'custom'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-white/10'
                }`}
              >
                <span>Upload Custom Logo</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            </div>
            {logoOption !== 'none' && (
              <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                ★ Error Correction automatically set to High (H - 30%) to ensure clean scans with center logo.
              </p>
            )}
          </div>

          {/* Advanced Sliders: Margin & ECC */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-white/5">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-zinc-300 mb-1">
                <span>Quiet Zone (Margin)</span>
                <span className="font-mono text-blue-600">{margin} modules</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={margin}
                onChange={(e) => setMargin(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-zinc-300 block mb-1">
                Error Correction Level
              </label>
              <select
                value={ecc}
                disabled={logoOption !== 'none'}
                onChange={(e) => setEcc(e.target.value as QrErrorCorrectionLevel)}
                className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-800 text-xs text-slate-900 dark:text-white"
              >
                <option value="L">Low (7% recovery)</option>
                <option value="M">Medium (15% - Recommended)</option>
                <option value="Q">Quartile (25% recovery)</option>
                <option value="H">High (30% - Best for Print/Logos)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Live QR Preview & Download Panel (5 Cols) */}
      <div className="lg:col-span-5 sticky top-24 space-y-4">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-lg space-y-6 text-center">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Preview</span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Active Matrix
            </span>
          </div>

          {/* Canvas Box */}
          <div className="relative mx-auto flex items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-100 dark:border-white/5 overflow-hidden">
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto rounded-lg shadow-sm"
              style={{ width: '280px', height: '280px' }}
            />
          </div>

          <div className="space-y-1 text-center">
            <p className="text-xs font-semibold text-slate-700 dark:text-zinc-300">
              Ready for Smartphone Camera Scan
            </p>
            <p className="text-[11px] text-slate-400">
              Compatible with iPhone iOS Camera, Google Lens, and Android scanners.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDownloadPng}
                className="py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PNG</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadSvg}
                className="py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Vector SVG</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleCopyToClipboard}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-zinc-800 text-xs font-semibold text-slate-700 dark:text-zinc-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Copy Image to Clipboard</span>
                </>
              )}
            </button>
          </div>

          {/* Security & Privacy Badge */}
          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% In-Browser • Never Stored or Tracked</span>
          </div>
        </div>
      </div>
    </div>
  );
}
