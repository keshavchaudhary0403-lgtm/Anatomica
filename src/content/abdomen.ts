import type { Clinical } from './types';

export const ABDOMEN: Record<string, Clinical> = {
  Liver: {
    supply: [
      { label: 'Blood supply', text: 'Hepatic artery proper (about 25%) and portal vein (about 75%)' },
      { label: 'Drainage', text: 'Hepatic veins to the IVC' },
    ],
    clinical: [
      'Liver biopsy is done in the right mid-axillary line at the 8th–9th intercostal space during expiration.',
      'Pringle manoeuvre: clamping the hepatoduodenal ligament controls bleeding from liver injury.',
      'Pain is referred to the right shoulder when the diaphragm is irritated.',
    ],
    neet: ['Couinaud divides the liver into 8 functional segments based on hepatic and portal vein branches; segment I is the caudate lobe.'],
    imaging: 'Ultrasound is first line; liver span is normally 12–15 cm in the mid-clavicular line.',
  },
  Spleen: {
    supply: [{ label: 'Artery', text: 'Splenic artery (coeliac trunk)' }],
    clinical: [
      'Most commonly injured organ in blunt abdominal trauma; Kehr sign is left shoulder pain from blood under the diaphragm.',
      'Enlarges towards the right iliac fossa; a palpable notch helps distinguish it from the kidney.',
      'After splenectomy, vaccinate against pneumococcus, meningococcus and Haemophilus influenzae.',
    ],
    neet: ['Odd numbers 1, 3, 5, 7, 9, 11: 1 × 3 × 5 inches, 7 oz, lies under ribs 9 to 11.'],
  },
  Stomach: {
    supply: [{ label: 'Arteries', text: 'Left and right gastric, left and right gastro-omental, short gastric arteries' }],
    clinical: [
      'Posterior duodenal ulcers erode the gastroduodenal artery; lesser curve gastric ulcers can erode the left gastric artery.',
      'Gastric outlet obstruction causes projectile non-bilious vomiting and a succussion splash.',
    ],
    neet: ['Left gastric artery is the most common source of bleeding from a lesser curvature ulcer.'],
  },
  Duodenum: {
    clinical: [
      'Most peptic ulcers occur in the first part (duodenal cap).',
      'Third part is crossed by the superior mesenteric artery; compression gives SMA syndrome.',
    ],
    neet: ['Major duodenal papilla (ampulla of Vater) is in the second part, about 8–10 cm from the pylorus.'],
  },
  Pancreas: {
    clinical: [
      'Carcinoma of the head obstructs the common bile duct: painless progressive jaundice with a palpable gallbladder (Courvoisier law).',
      'Acute pancreatitis pain radiates to the back; most common causes are gallstones and alcohol.',
    ],
    neet: ['Uncinate process lies behind the superior mesenteric vessels; only the tail is intraperitoneal.'],
  },
  Gallbladder: {
    supply: [{ label: 'Artery', text: 'Cystic artery, usually from the right hepatic artery' }],
    clinical: [
      'Murphy sign: inspiratory arrest on palpation below the right costal margin in acute cholecystitis.',
      'Calot triangle (cystic duct, common hepatic duct, liver edge) contains the cystic artery; identify it before clipping.',
    ],
    neet: ['Fundus surface marking: tip of the right 9th costal cartilage, where the linea semilunaris meets the costal margin.'],
    imaging: 'Ultrasound: stones with acoustic shadow, wall thickening and pericholecystic fluid.',
  },
  Kidney: {
    clinical: [
      'Renal angle tenderness (between the 12th rib and erector spinae) suggests pyelonephritis.',
      'Left renal vein is longer and crosses in front of the aorta under the SMA (nutcracker); left varicocele can signal left renal tumour.',
    ],
    neet: ['Order at the hilum, front to back: vein, artery, pelvis (VAP).'],
    imaging: 'Ultrasound for size and hydronephrosis; non-contrast CT KUB for stones.',
  },
  Ureter: {
    clinical: [
      'Stones lodge at the three constrictions: pelvi-ureteric junction, crossing of the iliac vessels, and vesico-ureteric junction.',
      'At risk in hysterectomy where it passes under the uterine artery ("water under the bridge").',
    ],
    neet: ['Renal colic radiates from loin to groin (T11–L2).'],
  },
  'Urinary bladder': {
    clinical: [
      'Suprapubic catheterisation: the distended bladder rises above the pubis, stripping the peritoneum off the anterior abdominal wall.',
      'Intraperitoneal rupture (full bladder, blow to the abdomen) needs surgery; extraperitoneal rupture often follows pelvic fracture.',
    ],
    neet: ['Trigone is smooth because its mucosa is firmly attached; it is the most sensitive part of the bladder.'],
    procedure: 'Suprapubic catheterisation',
  },
  Urethra: {
    clinical: [
      'Male urethra parts: prostatic (widest), membranous (narrowest, least distensible), spongy (longest).',
      'Straddle injury ruptures the bulbar urethra; pelvic fracture ruptures the membranous urethra with a high-riding prostate.',
      'Do not catheterise if there is blood at the meatus after trauma; get a urethrogram first.',
    ],
    neet: ['Male urethra is about 18–20 cm long; female about 4 cm.'],
    procedure: 'Foley catheterisation',
  },
  'Inguinal ligament': {
    clinical: [
      'Indirect inguinal hernia emerges lateral to the inferior epigastric artery; direct hernia emerges medial to it (Hesselbach triangle).',
      'Femoral hernia lies below and lateral to the pubic tubercle; inguinal hernia lies above and medial.',
    ],
    neet: ['Mid-inguinal point (femoral artery) differs from the midpoint of the inguinal ligament (deep inguinal ring).'],
  },
  'Rectus abdominis muscle': {
    supply: [{ label: 'Nerve', text: 'Lower six thoracic nerves (T7–T12)' }],
    clinical: ['Rectus sheath haematoma from rupture of the inferior epigastric artery can mimic an acute abdomen.'],
    neet: ['Below the arcuate line the posterior rectus sheath is absent.'],
  },
  'Inferior epigastric artery': {
    clinical: [
      'Avoid it during ascitic tap and laparoscopic port placement: puncture lateral to the rectus sheath.',
      'Landmark separating direct (medial) from indirect (lateral) inguinal hernias.',
    ],
    neet: ['Branch of the external iliac artery; anastomoses with the superior epigastric artery inside the rectus sheath.'],
    procedure: 'Ascitic tap',
  },
  'Abdominal aorta': {
    clinical: [
      'Abdominal aortic aneurysm: pulsatile, expansile mass above the umbilicus; repair is advised above 5.5 cm.',
      'Bifurcates at L4, at about the level of the umbilicus.',
    ],
    neet: ['Branches at L1: superior mesenteric artery; L3: inferior mesenteric artery; T12: coeliac trunk.'],
    imaging: 'Ultrasound screening; CT angiography to plan repair.',
  },
  'Inferior vena cava': {
    clinical: ['IVC filter is placed below the renal veins in patients with DVT who cannot be anticoagulated.'],
    neet: ['Formed by the common iliac veins at L5; passes through the diaphragm at T8.'],
  },
  'Sigmoid colon': {
    clinical: [
      'Sigmoid volvulus: "coffee bean" sign on abdominal X-ray, common in elderly, constipated patients.',
      'Diverticular disease is most common in the sigmoid colon.',
    ],
    neet: ['Has a mesentery (sigmoid mesocolon) and is mobile, which allows volvulus.'],
  },
  'Linea alba': {
    clinical: ['Midline laparotomy goes through it because it is relatively avascular.', 'Divarication of recti and epigastric hernias occur along it.'],
    neet: ['Formed by the fusion of the aponeuroses of the three flat abdominal muscles.'],
  },
  Prostate: {
    clinical: [
      'Benign enlargement affects the transition zone (median lobe), causing outflow obstruction.',
      'Carcinoma arises mainly in the peripheral zone and is felt on digital rectal examination as a hard nodule.',
      'Spreads to the vertebrae through Batson venous plexus.',
    ],
    neet: ['Median lobe enlargement causes the most urinary obstruction.'],
    procedure: 'Foley catheterisation',
  },
  'Uterus and uterine tubes': {
    supply: [
      { label: 'Artery', text: 'Uterine artery (internal iliac), anastomosing with the ovarian artery' },
      { label: 'Support', text: 'Pelvic floor (levator ani), transverse cervical (cardinal) and uterosacral ligaments' },
    ],
    clinical: [
      'Normally anteverted and anteflexed; a retroverted uterus is a common normal variant.',
      'The uterine artery crosses above the ureter near the cervix: the ureter is at risk in hysterectomy.',
      'Ectopic pregnancy is most common in the ampulla of the uterine tube; rupture causes haemoperitoneum.',
      'Uterine prolapse follows weakness of the cardinal and uterosacral ligaments and the pelvic floor.',
    ],
    neet: [
      'Parts of the uterine tube, lateral to medial: infundibulum (fimbriae), ampulla (fertilisation), isthmus, intramural part.',
      'Lymph from the fundus drains to para-aortic nodes; from the body to external iliac nodes; from around the uterine tube attachment to superficial inguinal nodes (round ligament).',
    ],
    imaging: 'Transvaginal ultrasound for endometrial thickness, fibroids and early pregnancy.',
  },
  Ovary: {
    supply: [{ label: 'Artery', text: 'Ovarian artery from the abdominal aorta at L2' }, { label: 'Vein', text: 'Right ovarian vein to the IVC; left to the left renal vein' }],
    clinical: [
      'Ovarian pain is referred to the medial thigh through the obturator nerve, which lies on the lateral pelvic wall next to the ovary.',
      'Ovarian torsion: sudden severe unilateral pain; a surgical emergency.',
      'Ovarian cancer often presents late with bloating and ascites; spreads across the peritoneum.',
    ],
    neet: ['Lies in the ovarian fossa, bounded by the external iliac vessels, ureter and internal iliac vessels.', 'Suspensory ligament of the ovary carries the ovarian vessels.'],
    imaging: 'Pelvic ultrasound; Doppler for torsion (absent flow is not always seen).',
  },
  Vulva: {
    supply: [{ label: 'Nerve', text: 'Pudendal nerve (S2–S4); anterior part by the ilio-inguinal and genitofemoral nerves' }],
    clinical: [
      'Bartholin gland abscess: painful swelling at the posterior part of the labium majus.',
      'Pudendal nerve block (at the ischial spine) is used for instrumental delivery.',
      'Episiotomy is usually mediolateral to avoid extending into the anal sphincter.',
    ],
    neet: ['External urethral meatus lies between the clitoris and the vaginal orifice.', 'Lymph drains to the superficial inguinal nodes.'],
    procedure: 'Foley catheterisation (female)',
  },
  Rectum: {
    supply: [{ label: 'Arteries', text: 'Superior rectal (inferior mesenteric), middle rectal (internal iliac), inferior rectal (internal pudendal)' }],
    clinical: [
      'Digital rectal examination feels the cervix in women and the prostate in men.',
      'Rectouterine pouch (of Douglas) is the lowest part of the female peritoneal cavity; fluid, pus or blood collects there.',
      'Internal haemorrhoids lie at 3, 7 and 11 o\'clock in the lithotomy position.',
    ],
    neet: ['Begins at S3; has no taeniae coli, appendices epiploicae or haustra.'],
  },
};
