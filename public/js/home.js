document.addEventListener('DOMContentLoaded', async function () {
  const FOLDER_ICON =
    'https://icons.iconarchive.com/icons/cornmanthe3rd/metronome/512/System-folder-icon.png';
  const content = document.querySelector('#content');

  function expandFolder(folder) {}
  function excludeFile(file) {}

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

    Object.values(params.files).map((fileName) => {
      folder.appendChild(createFile({ fileName }));
    });

    folder.appendChild(folderIcon);
    content.appendChild(folder);

    folder.addEventListener('click', expandFolder);
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
      return createFolder({ folderName: key, files: projects[key] });
    });
  }

  loadFolders();
});
