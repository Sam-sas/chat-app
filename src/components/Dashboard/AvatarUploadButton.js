import React from "react";
import { useState, useRef } from "react/cjs/react.development";
import { Alert, Button, Modal } from "rsuite";
import { useModalState } from "../../misc/custom-hooks";
import AvatarEditor from "react-avatar-editor";
import { resolveConfig } from "prettier";
import { database, storage } from "../../misc/firebase";
import { useProfile } from "../../context/profile.context";
import ProfileAvatar from "./ProfileAvatar";

export default function AvatarUploadButton() {
    const profile = useProfile();
    const fileInputTypes = '.png, .jpeg, .jpg';

    const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpeg'];
  const { isOpen, open, close } = useModalState();
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const avatarEditorRef = useRef();

  const getBlob = canvas => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('File process error'));
      }
    });
  });
};

//helper function
const isValidFile = file => acceptedFileTypes.includes(file.type);

  const onFileInputChange = (event) => {
      const currFiles = event.target.files;
      if(currFiles.length === 1) {
          const file = currFiles[0];
        if(isValidFile(file)) {
            setImg(file);
            open();
        } else {
            Alert.warning(`Wrong file type ${file.type}`, 4000);
        }
      }
  };

  const onUploadClick = async () => {
      //need to get the canvas inside DOM -- accessing the resulting image
      //ref is reacts way of accessing dom elements diretly(programmatically)
      const canvas = avatarEditorRef.current.getImageScaledToCanvas();
      //blob file is a piece of file represented as a binary format
      setLoading(true);
      try {
       const blob =  await getBlob(canvas);
       const avatarFileRef = storage.ref(`/profiles/${profile.profile.uid}`).child('avatar');
       const uploadAvatarResult = await avatarFileRef.put( blob, {
           //max time saved in cache 3 days
           cacheControl: `public, max-age=${3600 * 24 * 3}`
       } );

       const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();
       //save img to database
       const userAvatarRef = database.ref(`/profiles/${profile.profile.uid}`).child('avatar');
       userAvatarRef.set(downloadUrl);
       setLoading(false);
       Alert.info('avatar has been uploaded', 4000);

      } catch(err) {
          setLoading(false);
        Alert.error('avatar upload error', 4000);
      }
  }

  return (
    <div className="mt-3 text-center">
      <ProfileAvatar src={profile.profile.avatar} name={profile.profile.name} className="width-200 height-200 img-fullsize font-huge" />
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select new avatar
          <input
            id="avatar-upload"
            type="file"
            accept={fileInputTypes}
            className="d-none"
            onChange={onFileInputChange}
          />
        </label>

        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust and upload new avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {/* react avatar editor https://www.npmjs.com/package/react-avatar-editor */}
              <div className="d-flex justify-content-center align-items-center h-100">
                {img && <AvatarEditor
                    ref={avatarEditorRef}
                    image={img}
                    width={200}
                    height={200}
                    border={10}
                    borderRadius={100}
                    rotate={0}
                />}
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button block appearance="ghost" onClick={onUploadClick} disabled={loading}>
              Upload new avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
