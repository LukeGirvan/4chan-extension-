const checkbox = document.getElementById('myCheckbox1');

  // Load the initial state from storage (if available)
  chrome.storage.sync.get('myCheckboxState', function (data) {
    if (data.myCheckboxState !== undefined) {
      checkbox.checked = data.myCheckboxState;
    }
  });

  // Add an event listener to track changes, log the state, and send a message
  checkbox.addEventListener('change', function () {
    const isChecked = checkbox.checked;
    console.log('Checkbox state changed to:', isChecked);

    // Store the checkbox state in storage
    chrome.storage.sync.set({ myCheckboxState: isChecked });

    // Send a message to the background script
    chrome.runtime.sendMessage({ checkboxState: isChecked });
});

const folderInput = document.getElementById('folderName');

// Load the initial value from storage
chrome.storage.sync.get('folderName', function (data) {
  if (data.folderName !== undefined) {
    folderInput.value = data.folderName; // Set the value of the input field
  }
});

// Add an event listener to capture changes, log the state, and send a message
folderInput.addEventListener('input', function () {
  const folderName = folderInput.value;
  console.log('Folder name changed to:', folderName);

  // Store the folder name in storage
  chrome.storage.sync.set({ folderName: folderName });

  // Send a message to the background script
  chrome.runtime.sendMessage({ folderName: folderName });
});

const fileInput = document.getElementById('fileName');
console.log(fileInput)
// Load the initial value from storage
chrome.storage.sync.get('fileName', function (data) {
  if (data.fileName !== undefined) {
    fileInput.value = data.fileName; // Set the value of the input field
  }
});

// Add an event listener to capture changes, log the state, and send a message
fileInput.addEventListener('input', function () {
  const fileName = fileInput.value;
  console.log('Folder name changed to:', fileName);

  // Store the folder name in storage
  chrome.storage.sync.set({ fileName: fileName });

  // Send a message to the background script
  chrome.runtime.sendMessage({ fileName: fileName });
});

const downloadinput = document.getElementById('downloadDirectory');
console.log(downloadinput)
// Load the initial value from storage
chrome.storage.sync.get('downloadDirectory', function (data) {
  if (data.downloadDirectory !== undefined) {
    downloadinput.value = data.downloadDirectory; // Set the value of the input field
  }
});

// Add an event listener to capture changes, log the state, and send a message
downloadinput.addEventListener('input', function () {
  const downloadDirectory = downloadDirectory.value;
  console.log('downloadDirectory changed to:', downloadDirectory);

  // Store the folder name in storage
  chrome.storage.sync.set({ downloadDirectory: downloadDirectory });

  // Send a message to the background script
  chrome.runtime.sendMessage({ downloadDirectory: downloadDirectory });
});