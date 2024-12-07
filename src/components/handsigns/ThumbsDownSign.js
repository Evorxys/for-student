
import { Finger, FingerCurl, FingerDirection, GestureDescription } from 'fingerpose';

export const thumbsDownSign = new GestureDescription('Thumbs Down ');

// Thumb
thumbsDownSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
thumbsDownSign.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 0.75);

// Index
thumbsDownSign.addCurl(Finger.Index, FingerCurl.FullCurl, 1.0);
thumbsDownSign.addDirection(Finger.Index, FingerDirection.VerticalDown, 0.75);

// Middle
thumbsDownSign.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
thumbsDownSign.addDirection(Finger.Middle, FingerDirection.VerticalDown, 0.75);

// Ring
thumbsDownSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
thumbsDownSign.addDirection(Finger.Ring, FingerDirection.VerticalDown, 0.75);

// Pinky
thumbsDownSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
thumbsDownSign.addDirection(Finger.Pinky, FingerDirection.VerticalDown, 0.75);