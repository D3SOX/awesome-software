---
apps:
  Browser:
    Cromite:
      website: https://www.cromite.org/
      source: https://github.com/uazo/cromite
      apk: https://github.com/uazo/cromite/releases

    Firefox:
      website: http://www.mozilla.com/mobile/
      source: https://github.com/mozilla-firefox/firefox
      f-droid: https://f-droid.org/packages/org.mozilla.fennec_fdroid/
      google play: https://play.google.com/store/apps/details?id=org.mozilla.firefox
      apk: https://download.mozilla.org/?product=fennec-latest&os=android&lang=multi

    DuckDuckGo Privacy Browser:
      website: https://duckduckgo.com/app
      source: https://github.com/duckduckgo/Android
      f-droid: https://f-droid.org/packages/com.duckduckgo.mobile.android/
      google play: https://play.google.com/store/apps/details?id=com.duckduckgo.mobile.android

  AdBlocker root & non-root (VPN-based):
    AdAway:
      website: https://adaway.org/
      source: https://github.com/AdAway/AdAway
      f-droid: https://f-droid.org/packages/org.adaway/
      apk: https://app.adaway.org/adaway.apk

  AdBlocker non-root, VPN-based:
    DNS66:
      tags: [Discontinued]
      website: https://jak-linux.org/projects/dns66/
      source: https://github.com/julian-klode/dns66

    Blokada:
      website: https://blokada.org/
      source: https://github.com/blokadaorg/blokada
      apk: https://go.blokada.org/apk4

  Messenger:
    Signal:
      website: https://signal.org/
      source: https://github.com/signalapp/Signal-Android
      apk: https://signal.org/android/apk/
      google play: https://play.google.com/store/apps/details?id=org.thoughtcrime.securesms

    Briar:
      website: https://briarproject.org/
      source: https://code.briarproject.org/briar/briar
      f-droid: https://f-droid.org/packages/org.briarproject.briar.android/
      google play: https://play.google.com/store/apps/details?id=org.briarproject.briar.android

  Calendar and contacts sync:
    EteSync:
      website: https://www.etesync.com/
      source: https://github.com/etesync/android
      f-droid: https://f-droid.org/app/com.etesync.syncadapter
      google play: https://play.google.com/store/apps/details?id=com.etesync.syncadapter

  Duplicate Contacts Remover:
    Duplicate Contacts Remover:
      google play: https://play.google.com/store/apps/details?id=com.r4sh33d.duplicatecontactsremover

  Weather:
    Breezy Weather:
      source: https://github.com/breezy-weather/breezy-weather
      f-droid: https://github.com/breezy-weather/fdroid-repo/blob/main/README.md
      apk: https://github.com/breezy-weather/breezy-weather/releases

    Forecastie:
      source: https://github.com/martykan/forecastie
      f-droid: https://f-droid.org/packages/cz.martykan.forecastie/

  QR/Barcode Scanner:
    Barcode Scanner:
      source: https://gitlab.com/Atharok/BarcodeScanner
      f-droid: https://f-droid.org/packages/com.atharok.barcodescanner/
      google play: https://play.google.com/store/apps/details?id=com.atharok.barcodescanner

    QR & Barcode Scanner:
      source: https://github.com/dmitriy-ilchenko/QrAndBarcodeScanner
      f-droid: https://www.f-droid.org/packages/com.example.barcodescanner/
      apk: https://github.com/dmitriy-ilchenko/QrAndBarcodeScanner/releases

    Binary Eye:
      source: https://github.com/markusfisch/BinaryEye
      f-droid: https://f-droid.org/packages/de.markusfisch.android.binaryeye/
      google play: https://play.google.com/store/apps/details?id=de.markusfisch.android.binaryeye

  Maps and Navigation:
    CoMaps:
      website: https://www.comaps.app/
      source: https://codeberg.org/comaps/comaps
      f-droid: https://f-droid.org/packages/app.comaps.fdroid/
      apk: https://codeberg.org/comaps/comaps/releases
      google play: https://play.google.com/store/apps/details?id=app.comaps.google

    OsmAnd:
      website: https://osmand.net/
      source: https://github.com/osmandapp/Osmand
      f-droid: https://f-droid.org/packages/net.osmand.plus/
      google play: https://play.google.com/store/apps/details?id=net.osmand.plus

    Vela Maps:
      website: https://velamaps.org/
      source: https://github.com/PimpinPumpkin/Vela
      apk: https://github.com/PimpinPumpkin/Vela/releases

  Camera:
    Secure Camera:
      website: https://grapheneos.org/
      source: https://github.com/GrapheneOS/Camera
      apk: https://github.com/GrapheneOS/Camera/releases
      google play: https://play.google.com/store/apps/details?id=app.grapheneos.camera.play

    Open Camera:
      website: https://opencamera.org.uk/
      source: https://sourceforge.net/p/opencamera/code
      f-droid: https://f-droid.org/packages/net.sourceforge.opencamera/
      google play: https://play.google.com/store/apps/details?id=net.sourceforge.opencamera

  Music Player:
    Nevumi:
      website: https://nevumi.app/
      source: https://github.com/D3SOX/Nevumi
      f-droid repo: https://nevumi.app/fdroid/repo
      apk: https://github.com/D3SOX/Nevumi/releases

    Booming Music:
      source: https://github.com/mardous/BoomingMusic
      f-droid: https://f-droid.org/packages/com.mardous.booming/
      apk: https://github.com/mardous/BoomingMusic/releases

    Auxio:
      source: https://github.com/OxygenCobalt/Auxio
      f-droid: https://f-droid.org/packages/org.oxycblt.auxio/
      apk: https://github.com/OxygenCobalt/Auxio/releases

    Retro Music:
      website: https://retromusic.app/
      source: https://github.com/RetroMusicPlayer/RetroMusicPlayer
      google play: https://play.google.com/store/apps/details?id=code.name.monkey.retromusic
      apk: https://github.com/h4h13/RetroMusicPlayer/releases
      forks:
        Metro:
          purpose: Fork with premium features and without Google libraries
          source: https://github.com/MuntashirAkon/Metro
          f-droid: https://f-droid.org/packages/io.github.muntashirakon.Music/
          apk: https://github.com/MuntashirAkon/Metro/releases

    Phonograph Plus:
      source: https://github.com/chr56/Phonograph_Plus
      f-droid: https://f-droid.org/packages/player.phonograph.plus/
      apk: https://github.com/chr56/Phonograph_Plus/releases

  SMS:
    Fossify Messages:
      website: https://qklabs.com/
      source: https://github.com/FossifyOrg/Messages
      f-droid: https://f-droid.org/packages/org.fossify.messages/
      google play: https://play.google.com/store/apps/details?id=org.fossify.messages
      apk: https://github.com/FossifyOrg/Messages/releases

  Launcher:
    Lawnchair:
      website: https://lawnchair.app/
      source: https://github.com/LawnchairLauncher/Lawnchair
      apk: https://github.com/LawnchairLauncher/lawnchair/releases/tag/nightly

  Keyboard:
    FUTO Keyboard:
      website: https://keyboard.futo.org/
      source: https://gitlab.futo.org/keyboard/latinime
      f-droid repo: https://app.futo.org/fdroid/repo/
      apk: https://keyboard.futo.org/keyboard.apk
      google play: https://play.google.com/store/apps/details?id=org.futo.inputmethod.latin.playstore

    FlorisBoard:
      website: https://patrickgold.dev/
      source: https://github.com/florisboard/florisboard
      f-droid: https://f-droid.org/packages/dev.patrickgold.florisboard
      apk: https://github.com/florisboard/florisboard/releases

    Simple Keyboard:
      source: https://github.com/rkkr/simple-keyboard
      f-droid: https://f-droid.org/packages/rkr.simplekeyboard.inputmethod/
      google play: https://play.google.com/store/apps/details?id=rkr.simplekeyboard.inputmethod

  Note-taking:
    Notesnook:
      website: https://notesnook.com/
      source: https://github.com/streetwriters/notesnook
      f-droid: https://f-droid.org/en/packages/com.streetwriters.notesnook/
      google play: https://play.google.com/store/apps/details?id=com.streetwriters.notesnook&hl=de

    Standard Notes:
      website: https://standardnotes.com/
      source: https://github.com/standardnotes/app
      apk: https://github.com/standardnotes/app/releases
      google play: https://play.google.com/store/apps/details?id=com.standardnotes

    Simplenote:
      website: https://simplenote.com/
      source: https://github.com/Automattic/simplenote-android
      apk: https://github.com/Automattic/simplenote-android/releases
      google play: https://play.google.com/store/apps/details?id=com.automattic.simplenote

    Joplin:
      website: https://joplinapp.org/
      source: https://github.com/laurent22/joplin
      apk: https://github.com/laurent22/joplin-android/releases
      google play: https://play.google.com/store/apps/details?id=net.cozic.joplin

    Markor:
      source: https://github.com/gsantner/markor
      f-droid: https://f-droid.org/packages/net.gsantner.markor/
      google play: https://play.google.com/store/apps/details?id=net.gsantner.markor

  To Do:
    Tasks.org:
      website: https://tasks.org/
      source: https://github.com/tasks/tasks
      f-droid: https://f-droid.org/packages/org.tasks/
      google play: https://play.google.com/store/apps/details?id=org.tasks

  File Manager:
    Material Files:
      source: https://github.com/zhanghai/MaterialFiles
      f-droid: https://f-droid.org/packages/me.zhanghai.android.files/
      google play: https://play.google.com/store/apps/details?id=me.zhanghai.android.files

  Sync to PC:
    KDE Connect:
      website: https://kdeconnect.kde.org/
      source: https://invent.kde.org/kde/kdeconnect-kde
      f-droid: https://f-droid.org/packages/org.kde.kdeconnect_tp/
      google play: https://play.google.com/store/apps/details?id=org.kde.kdeconnect_tp

  Gallery:
    Fossify Gallery:
      website: https://qklabs.com/
      source: https://github.com/FossifyOrg/Gallery
      f-droid: https://f-droid.org/packages/org.fossify.gallery/
      google play: https://play.google.com/store/apps/details?id=org.fossify.gallery
      apk: https://github.com/FossifyOrg/Gallery/releases

    Aves:
      source: https://github.com/deckerst/aves
      f-droid: https://f-droid.org/packages/deckers.thibault.aves.libre/
      apk: https://github.com/deckerst/aves/releases
      google play: https://play.google.com/store/apps/details?id=deckers.thibault.aves

  Email Client:
    FairEmail:
      website: https://email.faircode.eu/
      source: https://github.com/M66B/FairEmail
      f-droid: https://f-droid.org/packages/eu.faircode.email/
      google play: https://play.google.com/store/apps/details?id=eu.faircode.email

    Thunderbird:
      website: https://www.thunderbird.net/mobile/
      source: https://github.com/thunderbird/thunderbird-android/
      f-droid: https://f-droid.org/packages/net.thunderbird.android
      apk: https://github.com/thunderbird/thunderbird-android/releases
      google play: https://play.google.com/store/apps/details?id=net.thunderbird.android

    Tuta Mail:
      website: https://tuta.com/
      source: https://github.com/tutao/tutanota
      f-droid: https://f-droid.org/packages/de.tutao.tutanota/
      google play: https://play.google.com/store/apps/details?id=de.tutao.tutanota

  Password Manager:
    Bitwarden:
      website: https://bitwarden.com/
      source: https://github.com/bitwarden/android
      f-droid repo: https://mobileapp.bitwarden.com/fdroid/repo/
      google play: https://play.google.com/store/apps/details?id=com.x8bit.bitwarden

    KeePassDX:
      website: https://www.keepassdx.com/
      source: https://github.com/Kunzisoft/KeePassDX
      f-droid: https://www.f-droid.org/packages/com.kunzisoft.keepass.libre/
      google play: https://play.google.com/store/apps/details?id=com.kunzisoft.keepass.free

  2FA app:
    Aegis:
      website: https://getaegis.app/
      source: https://github.com/beemdevelopment/Aegis
      f-droid: https://f-droid.org/packages/com.beemdevelopment.aegis
      apk: https://github.com/beemdevelopment/Aegis/releases
      google play: https://play.google.com/store/apps/details?id=com.beemdevelopment.aegis

    andOTP:
      tags: [Discontinued]
      source: https://github.com/andOTP/andOTP
      apk: https://github.com/andOTP/andOTP/releases

  Wallet:
    PDF Docket:
      website: https://pdf-docket.d3sox.me/
      source: https://github.com/D3SOX/pdf-docket
      f-droid: https://f-droid.org/packages/me.d3sox.pdfwallet/
      f-droid repo: https://pdf-docket.d3sox.me/repo
      apk: https://github.com/D3SOX/pdf-docket/releases

    FossWallet:
      source: https://github.com/SeineEloquenz/fosswallet
      f-droid: https://f-droid.org/packages/nz.eloque.foss_wallet/
      apk: https://github.com/SeineEloquenz/fosswallet/releases
      google play: https://play.google.com/store/apps/details?id=nz.eloque.foss_wallet

  Office:
    OnlyOffice:
      website: https://www.onlyoffice.com/office-for-android.aspx
      google play: https://play.google.com/store/apps/details?id=com.onlyoffice.documents

    Collabora Office:
      website: https://www.collaboraoffice.com/solutions/collabora-office-android-ios/
      source: https://github.com/CollaboraOnline/online.mirror/tree/main/android
      f-droid repo: https://www.collaboraoffice.com/releases-en/collabora-office-on-mobiles-supporting-password-protected-documents-and-available-on-f-droid/
      google play: https://play.google.com/store/apps/details?id=com.collabora.libreoffice

  Podcasts:
    AntennaPod:
      website: https://antennapod.org/
      source: https://github.com/AntennaPod/AntennaPod
      f-droid: https://f-droid.org/packages/de.danoeh.antennapod/
      google play: https://play.google.com/store/apps/details?id=de.danoeh.antennapod

  Firewall:
    AFWall+:
      website: https://github.com/ukanth/afwall/wiki
      source: https://github.com/ukanth/afwall
      f-droid: https://f-droid.org/packages/dev.ukanth.ufirewall/
      google play: https://play.google.com/store/apps/details?id=dev.ukanth.ufirewall
      apk: https://github.com/ukanth/afwall/releases

    NetGuard:
      website: https://www.netguard.me/
      source: https://github.com/M66B/NetGuard
      f-droid: https://f-droid.org/packages/eu.faircode.netguard/
      google play: https://play.google.com/store/apps/details?id=eu.faircode.netguard

  App Backups:
    Neo Backup:
      source: https://github.com/NeoApplications/Neo-Backup
      f-droid: https://f-droid.org/packages/com.machiav3lli.backup/
      apk: https://github.com/NeoApplications/Neo-Backup/releases

  Wallpapers:
    Aurora Walls:
      source: https://gitlab.com/AuroraOSS/AuroraWallpapers
      telegram: https://t.me/AuroraOfficial
      apk: https://gitlab.com/AuroraOSS/AuroraWallpapers/-/releases

  RSS reader:
    Flym:
      tags: [Discontinued]
      source: https://github.com/FredJul/Flym

    Feeder:
      source: https://gitlab.com/spacecowboy/Feeder
      f-droid: https://f-droid.org/packages/com.nononsenseapps.feeder/
      google play: https://play.google.com/store/apps/details?id=com.nononsenseapps.feeder.play

  Git Client:
    GitTouch:
      tags: [Discontinued]
      source: https://github.com/git-touch/git-touch
      apk: https://github.com/pd4d10/git-touch/releases

  File sharing:
    LocalSend:
      website: https://localsend.org/
      source: https://github.com/localsend/localsend/
      f-droid: https://f-droid.org/packages/org.localsend.localsend_app/
      apk: https://github.com/localsend/localsend/releases/
      google play: https://play.google.com/store/apps/details?id=org.localsend.localsend_app

  Network screen sharing:
    ScreenStream:
      source: https://github.com/dkrivoruchko/ScreenStream
      f-droid: https://f-droid.org/packages/info.dvkr.screenstream/
      google play: https://play.google.com/store/apps/details?id=info.dvkr.screenstream

  Download Manager:
    Download Navi:
      source: https://github.com/TachibanaGeneralLaboratories/download-navi
      f-droid: https://f-droid.org/packages/com.tachibana.downloader/
      apk: https://github.com/TachibanaGeneralLaboratories/download-navi/releases

  PDF Reader:
    Secure PDF Viewer:
      website: https://grapheneos.org/
      source: https://github.com/GrapheneOS/PdfViewer
      apk: https://github.com/GrapheneOS/PdfViewer/releases
      google play: https://play.google.com/store/apps/details?id=app.grapheneos.pdfviewer.play

    MJ PDF Reader:
      source: https://gitlab.com/mudlej_android/mj_pdf_reader
      f-droid repo: https://apt.izzysoft.de/fdroid/index/apk/com.gitlab.mudlej.MjPdfReader
      google play: https://play.google.com/store/apps/details?id=com.gitlab.mudlej.MjPdfReader

    MuPDF:
      website: https://mupdf.com/
      source: https://github.com/ArtifexSoftware/mupdf-android-viewer
      f-droid: https://f-droid.org/packages/com.artifex.mupdf.viewer.app/
      google play: https://play.google.com/store/apps/details?id=com.artifex.mupdf.viewer.app

  YouTube Client:
    OpenTubeX:
      website: https://opentubex.org/
      source: https://github.com/OpenTubeX/OpenTubeX
      f-droid repo: https://fdroid.opentubex.org/
      apk: https://github.com/OpenTubeX/OpenTubeX/releases

    LibreTube:
      source: https://github.com/libre-tube/LibreTube
      f-droid: https://f-droid.org/packages/com.github.libretube/
      apk: https://github.com/libre-tube/LibreTube/releases

    NewPipe:
      website: https://newpipe.net/
      source: https://github.com/TeamNewPipe/NewPipe
      f-droid: https://f-droid.org/packages/org.schabi.newpipe/

  Twitch Client:
    Twire:
      source: https://github.com/twireapp/Twire
      f-droid: https://f-droid.org/packages/com.perflyst.twire/
      apk: https://github.com/twireapp/Twire/releases

  Terminal:
    Termux:
      website: https://termux.com/
      source: https://github.com/termux/termux-app
      f-droid: https://f-droid.org/repository/browse/?fdid=com.termux
      google play: https://play.google.com/store/apps/details?id=com.termux
---

# Android
