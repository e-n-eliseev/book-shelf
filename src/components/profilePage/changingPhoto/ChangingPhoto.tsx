import { FC, useEffect, useState } from "react";
import face from "../../../assets/face.jpg";
import {
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth"
import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from "firebase/storage";
import PhotoButtons from "./photoButtons/PhotoButtons";
import { auth } from "../../../firebase/firebaseAuth";
import { storage } from "../../../firebase/firebase";
import { fileCheck } from "../../../helpers/uploadFileToFirebase";
import { ISetState } from "../../../types/types";

const ChangingPhoto: FC<ISetState> = ({ setError }) => {

    const [imgUrl, setImgUrl] = useState<string>("");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setImgUrl(`${user?.photoURL}`);
        });
    }, []);

    const handleSubmitImg = (event: any) => {
        event.preventDefault()
        const file = event.target[0]?.files[0]
        const resultOfCheckFile = fileCheck(file);

        if (event.nativeEvent.submitter.name === 'upload') {
            if (resultOfCheckFile[0]) {
                const storageRef = ref(storage, `files/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on("state_changed",
                    null,
                    (error) => {
                        console.log('Error', error)
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setImgUrl(downloadURL);
                            if (auth.currentUser) {
                                updateProfile(auth.currentUser, {
                                    photoURL: downloadURL
                                });
                            }
                        }).catch((error) => console.log('Error', error));
                    }
                );
            }
            else setError(`${resultOfCheckFile[1]}`);
        }

        if (event.nativeEvent.submitter.name === 'delete') {
            const storageRef = ref(storage, imgUrl);
            deleteObject(storageRef).then(() => {
                console.log('foto deleted');
                if (auth.currentUser) {
                    updateProfile(auth.currentUser, {
                        photoURL: ''
                    });
                }
                setImgUrl('');
            }).catch((error) => {
                console.log('Uh-oh, an error occurred!', error);
            });
        }
    }
    return (
        <form className="profile__form " action="" onSubmit={handleSubmitImg}>
            <h2 className="profile__form-heading">Фото:</h2>
            <div className="profile__form-content ">
                <div className="profile__img-wrapper">
                    <img className="profile__img" src={imgUrl ? imgUrl : face} alt='uploaded file' />
                </div>
                <PhotoButtons />
            </div>
        </form>
    )
}

export default ChangingPhoto;