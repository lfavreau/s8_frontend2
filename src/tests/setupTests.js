const { TextDecoder, TextEncoder } = require("util");
const { Blob, File } = require("buffer");
const { ReadableStream, TransformStream, WritableStream } = require("stream/web");
class MockBroadcastChannel {
  constructor(name) {
    this.name = name;
  }

  addEventListener() {}

  close() {}

  postMessage() {}

  removeEventListener() {}
}

class MockMessagePort {
  constructor() {
    this.onmessage = null;
    this.target = null;
  }

  addEventListener(type, listener) {
    if (type === "message") {
      this.onmessage = listener;
    }
  }

  close() {
    this.onmessage = null;
    this.target = null;
  }

  postMessage(message) {
    setTimeout(() => {
      this.target?.onmessage?.({ data: message });
    }, 0);
  }

  removeEventListener(type) {
    if (type === "message") {
      this.onmessage = null;
    }
  }

  start() {}
}

class MockMessageChannel {
  constructor() {
    this.port1 = new MockMessagePort();
    this.port2 = new MockMessagePort();
    this.port1.target = this.port2;
    this.port2.target = this.port1;
  }
}

global.BroadcastChannel = MockBroadcastChannel;
global.MessageChannel = MockMessageChannel;
global.MessagePort = MockMessagePort;
global.Blob = Blob;
global.File = File;
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
global.ReadableStream = ReadableStream;
global.TransformStream = TransformStream;
global.WritableStream = WritableStream;

const { fetch, FormData, Headers, Request, Response } = require("undici");

global.FormData = FormData;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;
window.FormData = FormData;
window.Headers = Headers;
window.Request = Request;
window.Response = Response;

require("@testing-library/jest-dom");

global.fetch = (input, init) => {
  const url =
    typeof input === "string" && input.startsWith("/")
      ? `${window.location.origin}${input}`
      : input;

  return fetch(url, init);
};

window.fetch = global.fetch;

const { server } = require("../mocks/server.js");

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
