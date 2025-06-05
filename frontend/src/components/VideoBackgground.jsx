import React from 'react'

function VideoBackgground() {
    return (
        <div className='w-screen'>
            <iframe
                className='w-screen aspect-video'
                src="https://www.youtube.com/embed/B9VRvOKKwfs?si=P0m_DDV1SA78ov2x&autoplay=1&mute=1"
                title="YouTube video player"
                frameborder="0"
                allowfullscreen>
            </iframe>
        </div>
    )
}

export default VideoBackgground
