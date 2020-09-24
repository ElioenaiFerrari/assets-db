document.addEventListener('DOMContentLoaded', async function () {
  const FOLDER_ICON =
    'https://icons.iconarchive.com/icons/cornmanthe3rd/metronome/512/System-folder-icon.png';
  const content = document.querySelector('#content');

  function expandFolder(folder) {}
  function excludeFile(file) {}

  function createFolder(params) {
    const folder = document.createElement('li');
    folder.setAttribute('class', 'folder');

    const folderIcon = document.createElement('img');
    folderIcon.setAttribute('class', 'folder-icon');
    folderIcon.setAttribute('src', FOLDER_ICON);

    const folderName = document.createElement('p');
    folderName.setAttribute('class', 'folder-name');
    folder.innerText = `${params.folderName}`;

    const file = document.createElement('div');
    file.setAttribute('class', 'file');

    const excludeFileButton = document.createElement('button');

    file.appendChild(excludeFileButton);
    folder.appendChild(file);
    folder.appendChild(folderIcon);
    content.appendChild(folder);

    folder.addEventListener('click', expandFolder);
    excludeFileButton.addEventListener('click', excludeFile);
  }

  async function getProjects() {
    try {
      const response = await fetch('http://localhost:3333/api/projects');
      const data = response.json();

      return data;
    } catch (error) {
      return error;
    }
  }

  async function loadFolders() {
    const projects = await getProjects();

    Object.keys(projects).map(function (key) {
      return createFolder({ folderName: key });
    });
  }

  loadFolders();
});
