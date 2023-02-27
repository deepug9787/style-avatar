"use strict";

const userProfile = document.querySelector(".user-profile");
const userProfileImg = userProfile.querySelector(".user-profile-content > img");
const avatarTypeBtn = userProfile.querySelector(".user-profile-content > button");
const defaultUserProfileImg = "default-profile-img";

const chooseAvatarType = document.querySelector(".choose-avatar-type");
const avatarTypeWrap = chooseAvatarType.querySelector(".avatar-type-wrap");
const avatarTypeTemplate = document.querySelector("#avatar-type-template");
const avatarTypes = ["nerd", "trendy", "saitama"];

const customizeLook = document.querySelector(".customize-look");
const customizeLookOptions = customizeLook.querySelector(".customize-look-options");
const finalLookImg = customizeLook.querySelector(".final-look > img");
const fullLookBtn = document.querySelector("#full-look-btn");
const saveLookBtn = document.querySelector("#save-look-btn");
const goBackBtn = document.querySelector(".go-back");
const customizeLookImgTypes = ["bottom", "center", "top"];
const defaultFinalLookImg = "base";

const sectionAll = document.querySelectorAll("section");
const closeBtnAll = document.querySelectorAll(".close-btn");
const imgFolderPath = "img";
const defaultImgExt = "svg";

function setUserProfileImg() {
    const imgSrc = localStorage.getItem("user-profile-img") ?? getDefaultUserProfileImgSrc();
    userProfileImg.setAttribute("src", imgSrc);
}

function getDefaultUserProfileImgSrc() {
    return `${imgFolderPath}/${defaultUserProfileImg}.${defaultImgExt}`;
}

function setAvatarImgSrc(imgEl, avatarType, imgName) {
    const src = `${imgFolderPath}/${avatarType}/${imgName}.${defaultImgExt}`;
    imgEl.setAttribute("src", src);
    return imgEl;
}

function getFullLookImg() {
    return customizeLookImgTypes.join("-");
}

function capitalizeStr(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// get filename from "img/filename.ext"
function getImgNameFromSrc(src) {
    return src.split("/").pop().split(".").shift();
}

function showActiveSection(section) {
    for (const sectionItem of sectionAll) {
        sectionItem.style.display = "none";
    }

    section.style.display = "block";
}

function generateAvatarTypes() {
    avatarTypeWrap.innerHTML = "";

    for (const avatarType of avatarTypes) {
        const clone = avatarTypeTemplate.content.cloneNode(true);
        let img = clone.querySelector("img");
        let figcaption = clone.querySelector("figcaption");

        img = setAvatarImgSrc(img, avatarType, getFullLookImg());
        img.setAttribute("data-avatar-type", avatarType);
        figcaption.textContent = capitalizeStr(avatarType);

        avatarTypeWrap.append(clone);
    }
}

function generateCustomizeLookOptions(avatarType) {
    customizeLookOptions.innerHTML = "";

    for (const customizeImgType of customizeLookImgTypes) {
        let img = document.createElement("img");
        img = setAvatarImgSrc(img, avatarType, customizeImgType);
        img.setAttribute("width", "130");
        img.setAttribute("height", "170");
        customizeLookOptions.append(img);
    }

    customizeLookOptions.setAttribute("data-avatar-type", avatarType);
}

function updateFinalLookImg() {
    const avatarType = customizeLookOptions.dataset.avatarType;
    const customizeLookImgAll = customizeLookOptions.querySelectorAll("img");
    let activeImgArr = [];

    for (const img of customizeLookImgAll) {
        const imgName = getImgNameFromSrc(img.getAttribute("src"));
        if (img.classList.contains("active")) activeImgArr.push(imgName);
    }

    const finalLookImgName = activeImgArr.length > 0 ? activeImgArr.join("-") : defaultFinalLookImg;
    setAvatarImgSrc(finalLookImg, avatarType, finalLookImgName);
}

function init() {
    setUserProfileImg();
    showActiveSection(userProfile);
}

avatarTypeBtn.addEventListener("click", function () {
    showActiveSection(chooseAvatarType);
    generateAvatarTypes();
});

avatarTypeWrap.addEventListener("click", function (e) {
    const avatarType = e.target.dataset.avatarType;

    showActiveSection(customizeLook);
    generateCustomizeLookOptions(avatarType);
    setAvatarImgSrc(finalLookImg, avatarType, defaultFinalLookImg);
});

customizeLookOptions.addEventListener("click", function (e) {
    if (!e.target.classList.contains("customize-look-options")) {
        e.target.classList.toggle("active");
    }
    updateFinalLookImg();
});

fullLookBtn.addEventListener("click", function () {
    const customizeLookImgAll = customizeLookOptions.querySelectorAll("img");
    for (const img of customizeLookImgAll) {
        img.classList.add("active");
    }
    customizeLookOptions.click();
});

saveLookBtn.addEventListener("click", function () {
    localStorage.setItem("user-profile-img", finalLookImg.getAttribute("src"));
    location.reload();
});

goBackBtn.addEventListener("click", () => {
    showActiveSection(chooseAvatarType);
});

for (const closeBtn of closeBtnAll) {
    closeBtn.addEventListener("click", function () {
        location.reload();
    });
}

init();
