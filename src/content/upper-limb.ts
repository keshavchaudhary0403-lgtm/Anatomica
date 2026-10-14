import type { Clinical } from './types';

export const UPPER_LIMB: Record<string, Clinical> = {
  // ---------- bones ----------
  Scapula: {
    clinical: [
      'Fractures are uncommon and usually follow high-energy trauma; look for associated rib and lung injury.',
      'Winging of the scapula follows long thoracic nerve injury (serratus anterior paralysis).',
    ],
    neet: [
      'The inferior angle lies over the 7th rib or intercostal space, a landmark for counting ribs from behind.',
      'Scapular anastomosis links the subclavian and axillary arteries; it keeps the limb perfused if the axillary artery is ligated proximal to the subscapular artery.',
    ],
  },
  Radius: {
    clinical: [
      'Colles fracture: fall on outstretched hand, distal radius fragment displaced dorsally ("dinner fork" deformity).',
      'Smith fracture is the reverse, with volar displacement.',
      'Pulled elbow in children: the radial head slips out of the annular ligament.',
      'Galeazzi fracture: radial shaft fracture with dislocation of the distal radio-ulnar joint.',
    ],
    neet: ['Colles fracture is the most common fracture in elderly women with osteoporosis.'],
    imaging: 'Lateral wrist X-ray shows dorsal tilt of the distal radius in Colles fracture.',
  },
  Ulna: {
    clinical: [
      'Monteggia fracture: proximal ulnar shaft fracture with dislocation of the radial head.',
      'Olecranon fracture disrupts the triceps insertion and active elbow extension.',
    ],
    neet: ['Mnemonic: Monteggia = Ulna fracture + radial head dislocation; Galeazzi = Radius fracture + distal radio-ulnar dislocation.'],
  },
  'Scaphoid bone': {
    supply: [{ label: 'Blood supply', text: 'Branches of the radial artery entering distally (retrograde supply)' }],
    clinical: [
      'Most commonly fractured carpal bone; tenderness in the anatomical snuffbox after a fall on the outstretched hand.',
      'Waist fractures risk avascular necrosis of the proximal pole because blood enters distally.',
      'Treat clinically suspected fractures as fractures even if the first X-ray is normal.',
    ],
    neet: ['Proximal pole avascular necrosis is the classic complication.'],
    imaging: 'Scaphoid views; repeat X-ray at 10–14 days or MRI if the first film is normal.',
  },
  'Lunate bone': {
    clinical: [
      'Most commonly dislocated carpal bone; displaced volarly into the carpal tunnel, it can compress the median nerve.',
      'Kienböck disease is avascular necrosis of the lunate.',
    ],
    neet: ['On a lateral X-ray the dislocated lunate looks like a "spilled teacup".'],
  },
  'Hamate bone': {
    clinical: ['Fracture of the hook of hamate (golf, racquet sports) can injure the ulnar nerve in Guyon canal.'],
    neet: ['Hook of hamate and pisiform form the medial boundary of Guyon canal.'],
  },
  'Fifth metacarpal bone': {
    clinical: ['Boxer\'s fracture: neck of the fifth metacarpal after punching a hard object.'],
    neet: ['Check for rotational deformity by asking the patient to make a fist.'],
  },
  'First metacarpal bone': {
    clinical: [
      'Bennett fracture: intra-articular fracture-dislocation at the base of the first metacarpal.',
      'Rolando fracture is a comminuted intra-articular base fracture.',
    ],
    neet: ['Abductor pollicis longus pulls the distal fragment proximally in Bennett fracture.'],
  },

  // ---------- shoulder muscles ----------
  'Deltoid muscle': {
    supply: [
      { label: 'Nerve', text: 'Axillary nerve (C5, C6)' },
      { label: 'Origin', text: 'Lateral clavicle, acromion and spine of scapula' },
      { label: 'Insertion', text: 'Deltoid tuberosity of humerus' },
      { label: 'Action', text: 'Abduction from 15° to 90°; anterior fibres flex, posterior fibres extend' },
    ],
    clinical: [
      'Deltoid IM injections are given into the upper part of the muscle, about 2.5 cm below the acromion, to avoid the axillary nerve.',
      'Axillary nerve palsy flattens the shoulder contour.',
    ],
    neet: ['Multipennate acromial fibres give strength for abduction.'],
    procedure: 'Deltoid IM injection',
  },
  'Infraspinatus muscle': {
    supply: [{ label: 'Nerve', text: 'Suprascapular nerve (C5, C6)' }, { label: 'Action', text: 'Lateral rotation of the arm' }],
    clinical: ['Suprascapular nerve entrapment at the spinoglenoid notch weakens infraspinatus alone.'],
    neet: ['Rotator cuff: supraspinatus, infraspinatus, teres minor, subscapularis (SITS).'],
  },
  'Teres minor muscle': {
    supply: [{ label: 'Nerve', text: 'Axillary nerve (C5, C6)' }, { label: 'Action', text: 'Lateral rotation of the arm' }],
    clinical: ['Tested with infraspinatus by resisted external rotation.'],
    neet: ['Only rotator cuff muscle supplied by the axillary nerve.'],
  },
  'Subscapularis muscle': {
    supply: [{ label: 'Nerve', text: 'Upper and lower subscapular nerves (C5, C6)' }, { label: 'Action', text: 'Medial rotation of the arm' }],
    clinical: ['Tear is tested with the lift-off and belly-press tests.'],
    neet: ['The only rotator cuff muscle that inserts on the lesser tubercle.'],
  },
  'Teres major muscle': {
    supply: [{ label: 'Nerve', text: 'Lower subscapular nerve (C5, C6)' }, { label: 'Action', text: 'Medial rotation, adduction and extension of the arm' }],
    clinical: ['Its lower border marks where the axillary artery becomes the brachial artery.'],
    neet: ['Forms the lower boundary of both the quadrangular and triangular spaces.'],
  },
  'Latissimus dorsi muscle': {
    supply: [{ label: 'Nerve', text: 'Thoracodorsal nerve (C6–C8)' }, { label: 'Action', text: 'Extension, adduction and medial rotation of the arm' }],
    clinical: [
      'Forms the posterior border of the triangle of safety for intercostal drain insertion.',
      'Used as a pedicled flap in breast reconstruction.',
      'Thoracodorsal nerve injury in axillary clearance weakens it.',
    ],
    neet: ['Called the "climbing" or "swimmer\'s" muscle.'],
  },
  'Serratus anterior muscle': {
    supply: [{ label: 'Nerve', text: 'Long thoracic nerve (C5–C7)' }, { label: 'Action', text: 'Protraction and upward rotation of the scapula' }],
    clinical: ['Paralysis causes winging of the scapula, seen when pushing against a wall.'],
    neet: ['Essential for raising the arm above the head (with trapezius).'],
  },
  'Pectoralis major muscle': {
    supply: [{ label: 'Nerve', text: 'Lateral and medial pectoral nerves (C5–T1)' }, { label: 'Action', text: 'Adduction and medial rotation; clavicular head flexes the arm' }],
    clinical: [
      'Forms the anterior border of the triangle of safety for chest drain insertion.',
      'Congenital absence of the sternocostal head is seen in Poland syndrome.',
    ],
    neet: ['Forms the anterior axillary fold.'],
  },
  'Pectoralis minor muscle': {
    supply: [{ label: 'Nerve', text: 'Medial pectoral nerve (C8, T1)' }],
    clinical: ['Divides the axillary artery into three parts and is a landmark for axillary node levels.'],
    neet: ['Level I nodes lie lateral, level II behind, and level III medial to pectoralis minor.'],
  },
  'Trapezius muscle': {
    supply: [{ label: 'Nerve', text: 'Spinal accessory nerve (CN XI); proprioception C3–C4' }],
    clinical: ['Spinal accessory nerve injury in posterior triangle surgery (e.g. node biopsy) causes shoulder droop and weak shrugging.'],
    neet: ['Upper fibres elevate, middle fibres retract and lower fibres depress the scapula.'],
  },

  // ---------- arm and forearm muscles ----------
  'Biceps brachii': {
    supply: [
      { label: 'Nerve', text: 'Musculocutaneous nerve (C5, C6)' },
      { label: 'Action', text: 'Supination (strongest), elbow flexion, weak shoulder flexion' },
    ],
    clinical: [
      'Biceps reflex tests C5–C6.',
      'Rupture of the long head tendon gives a "Popeye" bulge in the arm.',
      'The bicipital aponeurosis protects the brachial artery and median nerve during venepuncture.',
    ],
    neet: ['Long head tendon passes through the shoulder joint cavity, enclosed in synovial sheath.'],
  },
  'Triceps brachii': {
    supply: [{ label: 'Nerve', text: 'Radial nerve (C6–C8)' }, { label: 'Action', text: 'Elbow extension' }],
    clinical: ['Triceps reflex tests C7 (C6–C7).', 'Spared in radial nerve injury at the spiral groove because its branches arise higher.'],
    neet: ['Long head separates the quadrangular and triangular spaces.'],
  },
  'Brachialis muscle': {
    supply: [{ label: 'Nerve', text: 'Musculocutaneous nerve; small lateral part by the radial nerve' }, { label: 'Action', text: 'Main flexor of the elbow' }],
    clinical: ['Myositis ossificans can follow elbow injuries, especially after massage.'],
    neet: ['Called the "workhorse" of elbow flexion.'],
  },
  'Coracobrachialis muscle': {
    supply: [{ label: 'Nerve', text: 'Musculocutaneous nerve (C5–C7), which pierces it' }],
    clinical: ['Landmark for finding the musculocutaneous nerve during axillary blocks.'],
    neet: ['Its insertion marks the level where the brachial artery moves from medial to anterior.'],
  },
  'Brachioradialis muscle': {
    supply: [{ label: 'Nerve', text: 'Radial nerve' }, { label: 'Action', text: 'Elbow flexion with the forearm mid-prone' }],
    clinical: ['Brachioradialis (supinator) reflex tests C5–C6.'],
    neet: ['A flexor muscle supplied by the radial nerve, an extensor-compartment nerve.'],
  },
  'Pronator teres': {
    supply: [{ label: 'Nerve', text: 'Median nerve' }, { label: 'Action', text: 'Pronation and weak elbow flexion' }],
    clinical: ['Pronator teres syndrome: median nerve compressed between its two heads; sensory loss includes the palm (unlike carpal tunnel).'],
    neet: ['The median nerve passes between its superficial and deep heads.'],
  },
  'Flexor carpi ulnaris': {
    supply: [{ label: 'Nerve', text: 'Ulnar nerve' }, { label: 'Action', text: 'Wrist flexion and adduction' }],
    clinical: ['Cubital tunnel syndrome: ulnar nerve compressed between its two heads.'],
    neet: ['The pisiform is a sesamoid bone in its tendon.'],
  },
  'Flexor carpi radialis': {
    supply: [{ label: 'Nerve', text: 'Median nerve' }],
    clinical: ['Its tendon is the landmark for the radial pulse and ABG: the artery lies just lateral to it.'],
    neet: ['Its tendon passes through a separate compartment of the flexor retinaculum, not the carpal tunnel.'],
  },
  'Flexor digitorum superficialis': {
    supply: [{ label: 'Nerve', text: 'Median nerve' }, { label: 'Action', text: 'Flexes the proximal interphalangeal joints' }],
    clinical: ['Test by holding the other fingers straight and asking the patient to flex the PIP joint of the finger being tested.'],
    neet: ['Its tendons split to let the flexor digitorum profundus tendons pass (Camper chiasma).'],
  },
  'Flexor pollicis longus': {
    supply: [{ label: 'Nerve', text: 'Anterior interosseous nerve (median)' }],
    clinical: ['Loss of thumb IP flexion is part of anterior interosseous nerve syndrome.'],
    neet: ['Only muscle that flexes the interphalangeal joint of the thumb.'],
  },
  Supinator: {
    supply: [{ label: 'Nerve', text: 'Deep branch of the radial nerve' }],
    clinical: ['The posterior interosseous nerve can be compressed as it passes through supinator (arcade of Frohse).'],
    neet: ['Biceps is the more powerful supinator, especially with the elbow flexed.'],
  },
  'Abductor pollicis longus': {
    supply: [{ label: 'Nerve', text: 'Posterior interosseous nerve' }],
    clinical: ['De Quervain tenosynovitis affects APL and EPB in the first extensor compartment; Finkelstein test is positive.'],
    neet: ['APL and EPB form the lateral (anterior) boundary of the anatomical snuffbox.'],
  },
  'Extensor pollicis longus': {
    supply: [{ label: 'Nerve', text: 'Posterior interosseous nerve' }],
    clinical: ['Can rupture weeks after an undisplaced Colles fracture as it hooks around Lister tubercle.'],
    neet: ['Forms the medial (posterior) boundary of the anatomical snuffbox.'],
  },

  // ---------- hand muscles ----------
  'Abductor pollicis brevis': {
    supply: [{ label: 'Nerve', text: 'Recurrent (motor) branch of median nerve' }],
    clinical: ['Best muscle to test for median nerve function at the wrist; wasted early in carpal tunnel syndrome.'],
    neet: ['Thenar muscles: abductor pollicis brevis, flexor pollicis brevis (superficial head), opponens pollicis.'],
  },
  'Opponens pollicis muscle': {
    supply: [{ label: 'Nerve', text: 'Recurrent branch of median nerve' }],
    clinical: ['Loss of opposition with thumb in the plane of the palm: ape thumb deformity.'],
    neet: ['Opposition is the most important movement of the thumb.'],
  },
  'Adductor pollicis': {
    supply: [{ label: 'Nerve', text: 'Deep branch of ulnar nerve' }],
    clinical: ['Froment sign: in ulnar nerve palsy the patient flexes the thumb IP joint (FPL) to grip paper.'],
    neet: ['The only thenar-region muscle supplied by the ulnar nerve.'],
  },
  'Lumbrical muscles of hand': {
    supply: [{ label: 'Nerve', text: 'Lateral two: median nerve; medial two: ulnar nerve' }, { label: 'Action', text: 'Flex MCP joints and extend IP joints' }],
    clinical: ['Loss of medial lumbricals in ulnar palsy produces clawing of the ring and little fingers.'],
    neet: ['They arise from the flexor digitorum profundus tendons.'],
  },
  'Dorsal interossei muscles of hand': {
    supply: [{ label: 'Nerve', text: 'Deep branch of ulnar nerve' }, { label: 'Action', text: 'Abduct fingers (DAB)' }],
    clinical: ['First dorsal interosseous wasting is an early sign of ulnar nerve or T1 root lesion.'],
    neet: ['Dorsal ABduct, Palmar ADduct: DAB and PAD.'],
  },
  'Palmar interossei muscles': {
    supply: [{ label: 'Nerve', text: 'Deep branch of ulnar nerve' }, { label: 'Action', text: 'Adduct fingers (PAD)' }],
    clinical: ['Card test: inability to grip a card between the fingers in ulnar nerve palsy.'],
    neet: ['Dorsal ABduct, Palmar ADduct: DAB and PAD.'],
  },

  // ---------- nerves ----------
  'Anterior interosseous nerve of forearm': {
    clinical: [
      'Pure motor nerve: lesion causes weakness of FPL, lateral FDP and pronator quadratus with no sensory loss.',
      'Patient cannot make the "OK" sign; makes a pinch with straight fingertips instead.',
    ],
    neet: ['Branch of the median nerve given off near the cubital fossa.'],
  },
  'Posterior interosseous nerve of forearm': {
    clinical: ['Lesion causes finger drop with radial deviation on wrist extension (ECRL spared); no sensory loss.'],
    neet: ['Continuation of the deep branch of the radial nerve after it passes through supinator.'],
  },
  'Superficial branch of radial nerve': {
    clinical: [
      'Purely sensory; can be injured by cannulation of the cephalic vein at the wrist or by tight handcuffs (cheiralgia paraesthetica).',
    ],
    neet: ['Supplies skin over the first dorsal web space and lateral dorsum of the hand.'],
  },
  'Deep branch of ulnar nerve': {
    clinical: ['Lesion in Guyon canal or the palm weakens interossei and medial lumbricals without sensory loss.'],
    neet: ['Supplies hypothenar muscles, interossei, medial two lumbricals and adductor pollicis.'],
  },
  'Thoracodorsal nerve': {
    supply: [{ label: 'Roots', text: 'C6–C8 (posterior cord)' }],
    clinical: ['At risk during axillary node clearance; injury weakens latissimus dorsi.'],
    neet: ['Runs with the subscapular and thoracodorsal vessels on the posterior axillary wall.'],
  },
  'Suprascapular nerve': {
    supply: [{ label: 'Roots', text: 'C5, C6 (superior trunk)' }],
    clinical: ['Compression at the suprascapular notch weakens supraspinatus and infraspinatus.'],
    neet: ['Passes below the superior transverse scapular ligament; the suprascapular artery passes above ("Army goes over the bridge, Navy under").'],
  },
  'Roots of brachial plexus': {
    clinical: [
      'Upper root injury (C5–C6, Erb palsy): arm adducted and medially rotated, forearm pronated: "waiter\'s tip" position.',
      'Lower root injury (C8–T1, Klumpke palsy): claw hand, sometimes Horner syndrome if T1 is avulsed.',
    ],
    neet: ['Roots C5–T1 lie between scalenus anterior and scalenus medius with the subclavian artery.'],
  },
  'Superior trunk of brachial plexus': {
    clinical: ['Erb point injury (birth trauma, fall on the shoulder) damages C5–C6 fibres: Erb–Duchenne palsy.'],
    neet: ['Erb point: six nerves meet where C5 and C6 join to form the upper trunk.'],
  },
  'Inferior trunk of brachial plexus': {
    clinical: ['Damaged by excessive arm abduction (catching a branch while falling) or a cervical rib / Pancoast tumour: Klumpke palsy.'],
    neet: ['Cervical rib compresses the lower trunk and the subclavian artery (thoracic outlet syndrome).'],
  },

  // ---------- vessels ----------
  'Axillary artery': {
    clinical: [
      'Divided into three parts by pectoralis minor, with one, two and three branches respectively.',
      'Can be injured in shoulder dislocation or proximal humerus fracture in the elderly.',
    ],
    neet: ['Continuation of the subclavian artery from the outer border of the first rib to the lower border of teres major.'],
  },
  'Deep brachial artery': {
    clinical: ['Runs with the radial nerve in the spiral groove and is at risk in mid-shaft humerus fractures.'],
    neet: ['Also called profunda brachii; largest branch of the brachial artery.'],
  },
  'Ulnar artery': {
    clinical: ['Tested in the modified Allen test before radial artery puncture.', 'Hypothenar hammer syndrome: thrombosis of the ulnar artery in the palm after repeated trauma.'],
    neet: ['Mainly forms the superficial palmar arch.'],
  },
  'Superficial palmar arch': {
    clinical: ['Lies at the level of the distal border of the outstretched thumb (Kaplan line); deep cuts here bleed briskly.'],
    neet: ['Formed mainly by the ulnar artery, completed by the superficial palmar branch of the radial artery.'],
  },
  'Deep palmar arch': {
    clinical: ['Lies about 1 cm proximal to the superficial arch, deep to the long flexor tendons.'],
    neet: ['Formed mainly by the radial artery, completed by the deep branch of the ulnar artery.'],
  },
  'Basilic vein': {
    clinical: ['Common route for PICC lines because it runs a straighter course to the axillary vein.'],
    neet: ['Pierces the deep fascia in the middle of the arm and joins the brachial veins to form the axillary vein.'],
    procedure: 'PICC line insertion',
  },
  'Dorsal venous network of hand': {
    clinical: ['First choice site for peripheral IV cannulation: start distally so failed attempts do not block more proximal veins.'],
    neet: ['Drains laterally into the cephalic vein and medially into the basilic vein.'],
    procedure: 'Peripheral IV cannulation',
  },

  // ---------- joints and ligaments ----------
  'Articular capsule of glenohumeral joint': {
    clinical: [
      'Anterior dislocation is the most common (over 95%); the humeral head lies below the coracoid.',
      'Axillary nerve injury: check sensation over the regimental badge area before and after reduction.',
      'Bankart lesion (anterior labrum) and Hill-Sachs lesion (posterolateral humeral head) follow dislocation.',
    ],
    neet: ['The capsule is weakest inferiorly, where it is not supported by the rotator cuff.'],
    imaging: 'Posterior dislocation shows the "light bulb" sign on AP X-ray; seen after seizures and electric shock.',
  },
  'Articular capsule of elbow joint': {
    clinical: ['Posterior dislocation is most common; check the ulnar and median nerves and the brachial artery.'],
    neet: ['The three bony points (olecranon, medial and lateral epicondyles) form an equilateral triangle in flexion; it is disturbed in dislocation but not in supracondylar fracture.'],
  },
  'Flexor retinaculum of wrist': {
    clinical: [
      'Forms the roof of the carpal tunnel; division relieves carpal tunnel syndrome.',
      'Carpal tunnel syndrome is associated with pregnancy, hypothyroidism, diabetes, rheumatoid arthritis and acromegaly.',
    ],
    neet: ['Contents of the carpal tunnel: median nerve and nine tendons (4 FDS, 4 FDP, 1 FPL).'],
  },
  'Palmar aponeurosis': {
    clinical: ['Dupuytren contracture: nodular thickening and contracture, usually of the ring and little fingers.'],
    neet: ['Associated with alcohol use, diabetes, smoking and epilepsy treatment (phenytoin).'],
  },
  'Coraco-acromial ligament': {
    clinical: ['Forms the coraco-acromial arch over the supraspinatus tendon; impingement under it causes the painful arc.'],
    neet: ['Subacromial decompression may divide this ligament.'],
  },
  'Acromioclavicular ligament': {
    clinical: ['AC joint separation follows a fall on the point of the shoulder; the lateral clavicle rides up (step deformity).'],
    neet: ['Coracoclavicular ligament (conoid and trapezoid) is the main stabiliser of the AC joint.'],
  },
};
