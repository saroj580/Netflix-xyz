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
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                src="https://www.youtube.com/embed/B9VRvOKKwfs?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=B9VRvOKKwfs"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100vw',
                    height: '100vh',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
                title="Background Video"
            />
        </div>
    );
}

export default VideoBackgground;
