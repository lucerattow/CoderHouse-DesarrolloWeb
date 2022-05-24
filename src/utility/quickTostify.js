const sendMessage = (text, close, duration, backcolor, fontcolor) => {
    Toastify({
        text: text,
        duration: duration,
        gravity: "top",
        position: "right",
        close: close,
        style: {
            background: backcolor,
            color: fontcolor,
        },
    }).showToast()
};