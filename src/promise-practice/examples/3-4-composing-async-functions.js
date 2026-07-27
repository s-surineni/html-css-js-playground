function delay(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

async function fetchData() {
  await delay(30, 'fetching');
  return { raw: '  hello world  ' };
}

async function parse(data) {
  await delay(20, 'parsing');
  return data.raw.trim().toUpperCase();
}

async function logResult(result) {
  await delay(10, 'logging');
  console.log('final result:', result);
  return result;
}

async function pipeline() {
  const data = await fetchData();
  const parsed = await parse(data);
  return logResult(parsed);
}

const pipelinePromise = pipeline();
