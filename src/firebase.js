import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import config from "./config";
import "firebase/storage";

firebase.initializeApp(config);

var auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };

export const createDonorDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = db.doc(`donor/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email } = user;
    const { name } = additionalData;
    const { contactNo } = additionalData;
    const { cnic } = additionalData;
    try {
      userRef.set({
        name,
        email,
        contactNo,
        cnic,
        status: "active",
        createdAt: firebase.firestore.Timestamp.now().toDate().toString(),
      });
    } catch (err) {
      alert("Error in creating donor");
    }
  }
};
export const createReceiverDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = db.doc(`receiver/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email } = user;
    const { name } = additionalData;
    const { contactNo } = additionalData;
    const { cnic } = additionalData;
    try {
      userRef.set({
        name,
        email,
        contactNo,
        cnic,
        status: "active",
        createdAt: firebase.firestore.Timestamp.now().toDate().toString(),
      });
    } catch (err) {
      alert("Error in creating receiver");
    }
  }
};
export const createVolunteerDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = db.doc(`volunteer/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email } = user;
    const { name } = additionalData;
    const { contactNo } = additionalData;
    const { province } = additionalData;
    const { city } = additionalData;
    const { age } = additionalData;
    const { occupation } = additionalData;
    const { institution } = additionalData;
    try {
      userRef.set({
        name,
        email,
        contactNo,
        province,
        city,
        age,
        occupation,
        institution,
        status: "active",
        deliveryCount: 0,
        createdAt: firebase.firestore.Timestamp.now().toDate().toString(),
      });
    } catch (err) {
      alert("Error in creating volunteer");
    }
  }
};
