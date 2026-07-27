const records = new Map([
  [1, { id: 1, title: 'Promise notes' }],
]);

function loadRecord(recordId) {
  return new Promise((resolve, reject) => {
    queueMicrotask(() => {
      const record = records.get(recordId);
      if (!record) {
        reject(new Error(`Record ${recordId} not found`));
        return;
      }
      resolve(record);
    });
  });
}

async function run(recordId) {
  try {
    const record = await loadRecord(recordId);
    console.log('loaded:', record.title);
    return record;
  } catch (error) {
    console.log('caught:', error.message);
    return error.message;
  }
}

const runPromise = run(99);
