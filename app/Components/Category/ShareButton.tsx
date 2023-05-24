'use client'

const ShareButton = () => {
    const share = () => {
        console.log('fartegghole')
        if (navigator.share) {
            navigator
              .share({
                title: "This is header/title",
                text: "This is the description",
                url: "/",
              })
              .then(() => console.log("Successful share"))
              .catch((error) => console.log("Error sharing", error));
          } else {
            console.error("Browser doesn't support Web Share API");
          }
    }
    return (
        <button onClick={() => share()} className="bg-black h-8 w-8 rounded-full flex items-center justify-center overflow-hidden z-30">
            <svg className="h-4 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"/></svg>
        </button>
    )
}

export default ShareButton