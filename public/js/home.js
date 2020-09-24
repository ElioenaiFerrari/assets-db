document.addEventListener('DOMContentLoaded', async function () {
  const FOLDER_ICON =
    'https://icons.iconarchive.com/icons/cornmanthe3rd/metronome/512/System-folder-icon.png';
  const API_URL = 'http://localhost:3333/api';
  const content = document.querySelector('#content');

  function expandFolder(folder) {}
  function excludeFile(file) {}

  const uploadButton = document.querySelector('#upload');
  const confirmButton = document.querySelector('#confirm');

  const files = document.querySelector('input#files');

  window.addEventListener('mousemove', () => {
    if (files.value) {
      uploadButton.style.display = 'none';
      confirmButton.style.display = 'flex';
    } else {
      uploadButton.style.display = 'flex';
      confirmButton.style.display = 'none';
    }
  });

  confirmButton.addEventListener('click', async () => {
    try {
      const response = await fetch(`${API_URL}/uploads/arcelor`, {
        method: 'POST',
        body: JSON.stringify(files.value),
      });

      const data = response.json();

      console.log(data);
    } catch (error) {
      alert(error);
    }
  });

  function createFile({ fileName }) {
    const file = document.createElement('p');
    file.setAttribute('class', 'file');

    file.innerText = `${fileName}`;

    const excludeFileButton = document.createElement('button');
    excludeFileButton.addEventListener('click', excludeFile);

    file.appendChild(excludeFileButton);

    return file;
  }

  function createFolder(params) {
    const folder = document.createElement('li');
    folder.setAttribute('class', 'folder');

    const folderIcon = document.createElement('img');
    folderIcon.setAttribute('class', 'folder-icon');
    folderIcon.setAttribute('src', FOLDER_ICON);

    const folderName = document.createElement('p');
    folderName.setAttribute('class', 'folder-name');
    folder.innerText = `${params.folderName}`;

    folder.appendChild(folderIcon);
    content.appendChild(folder);

    // Object.values(params.files).map((fileName) => {
    //   folder.appendChild(createFile({ fileName }));
    // });

    folder.addEventListener('click', expandFolder);
  }

  async function getProjects() {
    try {
      const response = await fetch(`${API_URL}/projects`);
      const data = response.json();

      return data;
    } catch (error) {
      return error;
    }
  }

  async function loadFolders() {
    const projects = await getProjects();

    Object.keys(projects).map(function (key) {
      return createFolder({ folderName: key, files: projects[key] });
    });
  }

  loadFolders();
});
