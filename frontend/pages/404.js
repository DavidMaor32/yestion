import VideoPlayer from "../components/VideoPlayer";
const videoURL = "/nggyu.mp4";

export default function Custom404() {
    return <>
    404 - Page Not Found
    <VideoPlayer src={videoURL} />
    </>
  }
