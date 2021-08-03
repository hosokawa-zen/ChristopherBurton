import images from "../assets/images";
import {Linking} from "react-native";

export const socials = [
    {
        id: 1,
        imageSocial: images.icn_facebook_blue,
        appUrl: 'fb://',
        browserUrl: 'https://www.facebook.com',
        title: 'Facebook',
    },
    {
        id: 2,
        imageSocial: images.icn_Instagram,
        appUrl: 'instagram://',
        browserUrl: 'https://www.instagram.com',
        title: 'Instagram',
    },
    {
        id: 3,
        imageSocial: images.icn_youtube,
        appUrl: 'youtube://',
        browserUrl: 'https://www.youtube.com',
        title: 'Youtube',
    },
    {
        id: 4,
        imageSocial: images.icn_twitter,
        appUrl: 'twitter://',
        browserUrl: 'https://www.twitter.com',
        title: 'Twitter',
    },
];


export const openGotoSocialApp = (id) => {
    const social = socials.find(s => s.id === id);
    if(social){
        Linking.canOpenURL(social.appUrl).then((supported) => {
            if(!supported){
                Linking.openURL(social.browserUrl)
            } else {
                Linking.openURL(social.appUrl)
            }
        })
            .catch(err => console.log('link Error', err));
    }
}
