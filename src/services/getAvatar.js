function getAvatar(){
    const number = Math.floor(Math.random() * 6 + 1);
    const background = "/avatars/" + number + ".png";

    return "url(" + background +")";
}

export default getAvatar;