import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const okSign = new GestureDescription('OK');

// Thumb
okSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
okSign.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.75);

// Index
okSign.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
okSign.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.75);

// Middle
okSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
okSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.75);

// Ring
okSign.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
okSign.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.75);

// Pinky
okSign.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
okSign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.75);