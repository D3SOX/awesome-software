import {
    siAndroid,
    siApple,
    siAppstore,
    siCodeberg,
    siFdroid,
    siGithub,
    siGitlab,
    siGoogleplay,
    siKde,
    siLinux,
    siSourceforge,
    siTelegram,
} from 'simple-icons';
import * as lucide from 'lucide-static';

const filled = (path: string) =>
    `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${path}"/></svg>`;

type LucideName = keyof typeof lucide;
const outline = (name: LucideName) => lucide[name].replace('<svg', '<svg aria-hidden="true"').replace(/\s+/g, ' ').trim();

export const icons = {
    android: filled(siAndroid.path),
    apple: filled(siApple.path),
    appstore: filled(siAppstore.path),
    codeberg: filled(siCodeberg.path),
    fdroid: filled(siFdroid.path),
    github: filled(siGithub.path),
    gitlab: filled(siGitlab.path),
    googleplay: filled(siGoogleplay.path),
    kde: filled(siKde.path),
    linux: filled(siLinux.path),
    sourceforge: filled(siSourceforge.path),
    telegram: filled(siTelegram.path),
    // Simple Icons no longer ships Microsoft logos
    windows: filled('M3 5.1 10.4 4v7.2H3zm8.4-1.2L21 2.5v8.7h-9.6zM3 12.2h7.4v7.3L3 18.4zm8.4 0H21v8.7l-9.6-1.4z'),
    globe: outline('Globe'),
    code: outline('CodeXml'),
    download: outline('Download'),
    package: outline('Package'),
    monitor: outline('Monitor'),
};

export type IconName = keyof typeof icons;

export const platforms = [
    { slug: 'android', name: 'Android', icon: 'android' },
    { slug: 'ios', name: 'iOS', icon: 'apple' },
    { slug: 'desktop', name: 'Desktop', title: 'Cross-platform desktop', icon: 'monitor' },
    { slug: 'linux', name: 'Linux', icon: 'linux' },
    { slug: 'windows', name: 'Windows', icon: 'windows' },
] as const satisfies readonly { slug: string; name: string; title?: string; icon: IconName }[];

const categoryIcons: Record<string, LucideName> = {
    '2FA app': 'ShieldCheck',
    'Activator': 'BadgeCheck',
    'AdBlocker': 'ShieldBan',
    'AdBlocker non-root, VPN-based': 'ShieldBan',
    'AdBlocker root & non-root (VPN-based)': 'ShieldBan',
    'Advanced Text Editor': 'FileCode',
    'AirPlay server': 'Cast',
    'App Backups': 'ArchiveRestore',
    'Archive Manager': 'Archive',
    'Audio Recorder and Editor': 'AudioLines',
    'Browser': 'Globe',
    'Calendar and contacts sync': 'Calendar',
    'Camera': 'Camera',
    'Control Android device': 'MonitorSmartphone',
    'Data Backup and Restore': 'DatabaseBackup',
    'Debloater': 'Eraser',
    'Disk Space Analyzer': 'HardDrive',
    'Download Manager': 'Download',
    'Duplicate Contacts Remover': 'UserX',
    'Email Client': 'Mail',
    'File Manager': 'Folder',
    'File sharing': 'Share2',
    'Firewall': 'BrickWall',
    'Gallery': 'Images',
    'Gaming': 'Gamepad2',
    'Gaming Device Config': 'Mouse',
    'GIF Recorder': 'Film',
    'Git Client': 'GitBranch',
    'Image Editor': 'ImagePlus',
    'Image Viewer': 'Image',
    'Jailbreak Tweaks': 'Puzzle',
    'Keyboard': 'Keyboard',
    'Launcher': 'LayoutGrid',
    'Maps and Navigation': 'Map',
    'Media Player': 'Play',
    'Messenger': 'MessageCircle',
    'Music Player': 'Music',
    'Network screen sharing': 'ScreenShare',
    'Note-taking': 'NotebookPen',
    'Office': 'Briefcase',
    'Office Suite': 'Briefcase',
    'Package Manager': 'PackageOpen',
    'Password Manager': 'KeyRound',
    'PDF Reader': 'FileText',
    'Podcasts': 'Podcast',
    'QR/Barcode Scanner': 'ScanQrCode',
    'Remote Desktop Client': 'MonitorDot',
    'RGB lighting control': 'Lightbulb',
    'RSS reader': 'Rss',
    'Screen Recorder': 'Video',
    'Screenshot Tool': 'Crop',
    'SFTP/FTP Client': 'FolderSync',
    'SMS': 'MessageSquareText',
    'Sync to PC': 'RefreshCw',
    'System Snapshots': 'History',
    'Terminal': 'SquareTerminal',
    'To Do': 'ListTodo',
    'Torrent Client': 'Magnet',
    'Twitch Client': 'Tv',
    'Video Editor': 'Clapperboard',
    'Wallet': 'Wallet',
    'Wallpapers': 'Wallpaper',
    'Weather': 'CloudSun',
    'YouTube Client': 'TvMinimalPlay',
};

/** Generic icon for a `## Category` heading; new categories fall back to a tag until mapped */
export const categoryIcon = (name: string) => outline(categoryIcons[name] ?? 'Tag');

/** CSS that shows category icons in VitePress's "On this page" list, matched by the link's title */
export const categoryIconCss = () =>
    Object.entries(categoryIcons)
        .map(([name, icon]) => {
            const url = `url("data:image/svg+xml,${encodeURIComponent(lucide[icon])}")`;
            return `.outline-link[title="${name}"]::before{content:'';mask-image:${url}}`;
        })
        .join('\n');
