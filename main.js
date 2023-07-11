let peer = new Peer();

let localRoomId = document.querySelector("#localRoomId");
let remoteRoomId = document.querySelector("#remoteRoomId");
let callBtn = document.querySelector("#callBtn");

let localStream;

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    const localVideoStream = document.querySelector("#localStream");
    localStream = stream;
    localVideoStream.srcObject = stream;
    localVideoStream.onloadedmetadata = () => {
      localVideoStream.play();
    };
  });

peer.on("open", (id) => {
  localRoomId.value = id;
});

callBtn.addEventListener("click", () => {
  const remoteID = remoteRoomId.value;
  console.log(remoteID);
  const call = peer.call(remoteID, localStream);

  call.on("stream", (stream) => {
    const remoteVideoStream = document.querySelector("#remoteStream");
    remoteVideoStream.srcObject = stream;
    remoteVideoStream.onloadedmetadata = () => {
      remoteVideoStream.play();
    };
  });
});

peer.on("call", (call) => {
  call.answer(localStream);
  call.on("stream", (stream) => {
    const remoteVideoStream = document.querySelector("#remoteStream");
    remoteVideoStream.srcObject = stream;
    remoteVideoStream.onloadedmetadata = () => {
      remoteVideoStream.play();
    };
  });
});
