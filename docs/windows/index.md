---
apps:
  Debloater:
    Winutil:
      website: https://winutil.christitus.com/
      source: https://github.com/ChrisTitusTech/winutil
      install:
        note: Run in PowerShell as admin
        powershell: irm "https://christitus.com/win" | iex

  Activator:
    Microsoft Activation Scripts:
      website: https://massgrave.dev/
      source: https://github.com/massgravel/Microsoft-Activation-Scripts
      install:
        note: Run in PowerShell as admin
        powershell: irm https://get.activated.win | iex

    vlmcsd:
      tags: [Discontinued]
      source:
        - https://github.com/Wind4/vlmcsd
        - install script: https://github.com/Airr/vlmcsd-autokms
      download:
        install script: https://github.com/Airr/vlmcsd-autokms/archive/refs/heads/master.zip

  Package Manager:
    Winget:
      website: https://docs.microsoft.com/windows/package-manager/winget/
      source: https://github.com/microsoft/winget-cli
      download: https://apps.microsoft.com/store/detail/app-installer/9NBLGGH4NNS1

    Chocolatey:
      website: https://chocolatey.org/
      source: https://github.com/chocolatey/choco
      download: https://chocolatey.org/install

    Scoop:
      website: https://scoop.sh/
      source: https://github.com/lukesampson/scoop
      download: https://scoop.sh/#installs-in-seconds

  PDF Reader:
    Sumatra PDF:
      website: https://www.sumatrapdfreader.org
      source: https://github.com/sumatrapdfreader/sumatrapdf
      download: https://www.sumatrapdfreader.org/download-free-pdf-viewer

  Screenshot Tool:
    ShareX:
      website: https://getsharex.com/
      source: https://github.com/ShareX/ShareX
      download: https://getsharex.com/downloads

  Archive Manager:
    7-Zip:
      website: https://www.7-zip.org/
      source: https://sourceforge.net/projects/sevenzip/files/7-Zip/
      download: https://www.7-zip.org/download.html

  SFTP/FTP Client:
    WinSCP:
      website: https://winscp.net/
      source: https://github.com/winscp/winscp
      download: https://winscp.net/download.php

  Disk Space Analyzer:
    WinDirStat:
      website: https://windirstat.net/
      source: https://github.com/windirstat/windirstat
      download: https://windirstat.net/download.html

  Media Player:
    QMPlay2:
      source: https://github.com/zaps166/QMPlay2
      download: https://github.com/zaps166/QMPlay2/releases
---

# Windows
