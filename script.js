function uploadFile() {
  const fileInput = document.getElementById('fileToUpload');
  const file = fileInput.files[0];
  
  if (!file) {
    alert('Please select a file to upload.');
    return;
  }
  
  const formData = new FormData();
  formData.append('file', file);

  fetch('/.netlify/functions/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('File uploaded successfully!');
      fileInput.value = '';
      updateFileList();
    } else {
      alert('File upload failed.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred during file upload.');
  });
}

function updateFileList() {
  fetch('/.netlify/functions/files')
    .then(response => response.json())
    .then(data => {
      const fileList = document.getElementById('fileList');
      fileList.innerHTML = '';
      data.files.forEach(file => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `/uploads/${file}`;
        link.textContent = file;
        listItem.appendChild(link);
        fileList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while retrieving the file list.');
    });
}

updateFileList();
