let index = 0
chrome.runtime.onConnect.addListener((port) => {
  console.assert(port.name === 'content-script');

  // Example: Sending a message to the content script
  port.postMessage({ message: 'Hello from background script' });

  // Example: Listening for messages from the content script
  port.onMessage.addListener((message) => {
    console.log('Message from content script:', message);
  });
});

// @ts-check
/** @typedef {{ numberOfProcessedImages: number, imagesToDownload: string[], options: any, next: () => void }} Task */

/** @type {Set<Task>} */
const tasks = new Set();

chrome.runtime.onMessage.addListener(startDownload);
chrome.downloads.onDeterminingFilename.addListener(suggestNewFilename);

// NOTE: Don't directly use an `async` function as a listener for `onMessage`:
// https://stackoverflow.com/a/56483156
// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onMessage
function startDownload(
/** @type {any} */ message,
/** @type {chrome.runtime.MessageSender} */ sender,
/** @type {(response?: any) => void} */ resolve
) {
if (!(message && message.type === 'downloadImages')) return;

downloadImages({
  numberOfProcessedImages: 0,
  imagesToDownload: message.imagesToDownload,
  options: message.options,
  next() {
    this.numberOfProcessedImages += 1;
    if (this.numberOfProcessedImages === this.imagesToDownload.length) {
      tasks.delete(this);
    }
  },
}).then(resolve);

return true; // Keeps the message channel open until `resolve` is called
}

async function downloadImages(/** @type {Task} */ task) {
tasks.add(task);
for (const image of task.imagesToDownload) {
  await new Promise((resolve) => {
    chrome.downloads.download({ url: image }, (downloadId) => {
      if (downloadId == null) {
        if (chrome.runtime.lastError) {
          console.error(`${image}:`, chrome.runtime.lastError.message);
        }
        task.next();
      }
      resolve();
    });
  });
}
}


// https://developer.chrome.com/docs/extensions/reference/downloads/#event-onDeterminingFilename
/** @type {Parameters<chrome.downloads.DownloadDeterminingFilenameEvent['addListener']>[0]} */
function suggestNewFilename(item, suggest) {
const task = [...tasks][0];
if (!task) {
  suggest();
  return;
}
console.log(task)
const regex = /(?:\.([^.]+))?$/;
const extension = regex.exec(item.filename)[1];
console.log('index:', index);
console.log('task.options.folder_name:', task.options.fileNames[task.numberOfProcessedImages]);
console.log('task.options.folder_name:', task.options.fileNames)
console.log(item)
console.log(task)
let newFilename = task.options.folder_name+ '/' + task.options.fileNames[task.numberOfProcessedImages]
newFilename += `.${extension}`;

index+=1

suggest({ filename: normalizeSlashes(newFilename) });
task.next();
}

function normalizeSlashes(filename) {
return filename.replace(/\\/g, '/').replace(/\/{2,}/g, '/');
}
