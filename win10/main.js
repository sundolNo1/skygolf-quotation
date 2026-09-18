const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1360, height: 900, minWidth: 900, minHeight: 600,
    title: 'SKY GOLF 견적 프로그램',
    icon: path.join(__dirname, 'build', process.platform === 'win32' ? 'icon.ico' : 'icon.png'),
    webPreferences: { contextIsolation: true, nodeIntegration: false, spellcheck: false }
  });
  win.loadFile(path.join(__dirname, 'app', 'index.html'));
  if (process.env.SKYGOLF_SMOKE) {   // 빌드 검증용: 로드 확인 후 자동 종료
    win.webContents.once('did-finish-load', async () => {
      const r = await win.webContents.executeJavaScript('JSON.stringify({title:document.title, fn:typeof renderPaper, courses:COURSES.length, q:!!Q})');
      console.log('SMOKE ' + r); app.quit();
    });
  }
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });

  // 이미지(JPG)·백업(JSON) 저장 시 저장 위치를 물어봄
  win.webContents.session.on('will-download', (e, item) => {
    const name = item.getFilename();
    const r = dialog.showSaveDialogSync(win, { title: '파일 저장', defaultPath: path.join(app.getPath('downloads'), name) });
    if (!r) { item.cancel(); return; }
    item.setSavePath(r);
    item.once('done', (ev, state) => { if (state === 'completed') shell.showItemInFolder(r); });
  });

  const menu = Menu.buildFromTemplate([
    { label: '파일', submenu: [
      { label: '인쇄 / PDF 저장', accelerator: 'CmdOrCtrl+P', click: () => win.webContents.print({}) },
      { type: 'separator' },
      { role: 'quit', label: '종료' } ] },
    { label: '보기', submenu: [
      { role: 'reload', label: '새로고침' },
      { role: 'resetZoom', label: '원래 크기' }, { role: 'zoomIn', label: '확대' }, { role: 'zoomOut', label: '축소' },
      { type: 'separator' }, { role: 'togglefullscreen', label: '전체 화면' } ] },
    { label: '도움말', submenu: [
      { label: '데이터 저장 위치 열기', click: () => shell.openPath(app.getPath('userData')) },
      { label: '프로그램 정보', click: () => dialog.showMessageBox(win, { type: 'info', title: '프로그램 정보',
          message: 'SKY GOLF 견적 프로그램 ' + app.getVersion(), detail: '견적·설정·단가표는 이 컴퓨터 안에 저장됩니다.\n설정 탭의 전체 백업으로 주기적으로 백업해 주세요.' }) } ] }
  ]);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
