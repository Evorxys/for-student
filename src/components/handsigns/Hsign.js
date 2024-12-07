import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const hSign = new GestureDescription('H');
// [
//     [
//       "Thumb",
//       "No Curl",
//       "Horizontal Right"
//     ],
//     [
//       "Index",
//       "No Curl",
//       "Horizontal Right"
//     ],
//     [
//       "Middle",
//       "No Curl",
//       "Horizontal Right"
//     ],
//     [
//       "Ring",
//       "Full Curl",
//       "Horizontal Right"
//     ],
//     [
//       "Pinky",
//       "Full Curl",
//       "Horizontal Right"
//     ]
//   ]

//Thumb
hSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
hSign.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.70);

//Index
hSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
hSign.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.70);

//Middle
hSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);
hSign.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 0.70);

//Ring
hSign.addCurl(Finger.Ring, FingerCurl.FullCurl, 1);
hSign.addDirection(Finger.Ring, FingerDirection.HorizontalRight, 0.70);

//Pinky
hSign.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1);
hSign.addDirection(Finger.Pinky, FingerDirection.HorizontalRight, 0.70);

export const helloSign = new GestureDescription('Hello');

// Thumb
helloSign.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
helloSign.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.75);

// Index
helloSign.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
helloSign.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.75);

// Middle
helloSign.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
helloSign.addDirection(Finger.Middle, FingerDirection.VerticalUp, 0.75);

// Ring
helloSign.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
helloSign.addDirection(Finger.Ring, FingerDirection.VerticalUp, 0.75);

// Pinky
helloSign.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
helloSign.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 0.75);

