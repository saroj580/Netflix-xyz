import React from 'react';

function VideoBackgground() {
    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            pointerEvents: 'none'
        }}>
            <iframe
                src="https://www.youtube.com/embed/B9VRvOKKwfs?si=P0m_DDV1SA78ov2x&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=B9VRvOKKwfs"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100vw',
                    height: '100vh',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none'
                }}
                title="Background Video"
            />
        </div>
    );
}

export default VideoBackgground;
