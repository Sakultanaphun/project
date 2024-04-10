```javascript
// สร้างฟังก์ชันสำหรับแปลงรูปภาพเป็นข้อความโดยใช้ OCR
function convertImageToText(image) {
  // ใช้ไลบรารี Tesseract.js สำหรับการแปลง OCR
  Tesseract.recognize(image, {
    lang: 'tha' // ระบุภาษาไทย
  })
  .then(function(result) {
    // ผลลัพธ์ของการแปลง OCR จะอยู่ในตัวแปร result.text
    let text = result.text;

    // แยกข้อความที่แปลงได้ออกเป็นรายการ
    let lines = text.split('\n');

    // ลบช่องว่างที่ไม่จำเป็นออกจากแต่ละบรรทัด
    lines = lines.map(line => line.trim());

    // กรองบรรทัดที่ว่างออก
    lines = lines.filter(line => line !== '');

    // ค้นหาข้อมูลที่ต้องการจากรายการบรรทัด
    let name = lines.find(line => line.includes('ชื่อ-นามสกุล'));
    let birthDate = lines.find(line => line.includes('วันเกิด'));
    let age = lines.find(line => line.includes('อายุ'));
    let religion = lines.find(line => line.includes('ศาสนา'));
    let provinceOfBirth = lines.find(line => line.includes('จังหวัดที่เกิด'));
    let idCardNumber = lines.find(line => line.includes('เลขบัตรประจำตัวประชาชน'));
    let idCardIssueDate = lines.find(line => line.includes('วันออกบัตร'));
    let idCardExpirationDate = lines.find(line => line.includes('วันหมดอายุ'));
    let idCardIssuedBy = lines.find(line => line.includes('ออกโดยเขตหรืออำเภอ'));
    let province = lines.find(line => line.includes('จังหวัด'));
    let address = lines.find(line => line.includes('ที่อยู่ตามสำเนาทะเบียนบ้าน'));
    let houseNumber = lines.find(line => line.includes('เลขที่'));
    let village = lines.find(line => line.includes('หมู่ที่/หมู่บ้าน'));
    let alley = lines.find(line => line.includes('ตรอก/ซอย'));
    let district = lines.find(line => line.includes('เขต/อำเภอ'));
    let postalCode = lines.find(line => line.includes('รหัสไปรษณีย์'));
    let homePhoneNumber = lines.find(line => line.includes('เบอร์โทรศัพท์บ้าน'));
    let currentAddress = lines.find(line => line.includes('ที่ปัจจุบัน'));
    let currentHouseNumber = lines.find(line => line.includes('บ้านเลขที่'));
    let currentVillage = lines.find(line => line.includes('หมู่ที่'));
    let currentBuilding = lines.find(line => line.includes('อาคารหมู่บ้าน'));
    let currentAlley = lines.find(line => line.includes('ตรอก ซอย'));

    // กรอกข้อมูลที่แปลงได้ลงในอินพุตต่างๆ
    document.querySelector('input[name="ชื่อ-นามสกุล"]').value = name;
    document.querySelector('input[name="วันเกิด"]').value = birthDate;
    document.querySelector('input[name="อายุ"]').value = age;
    document.querySelector('input[name="ศาสนา"]').value = religion;
    document.querySelector('input[name="จังหวัดที่เกิด"]').value = provinceOfBirth;
    document.querySelector('input[name="เลขบัตรประจำตัวประชาชน"]').value = idCardNumber;
    document.querySelector('input[name="วันออกบัตร"]').value = idCardIssueDate;
    document.querySelector('input[name="วันหมดอายุ"]').value = idCardExpirationDate;
    document.querySelector('input[name="ออกโดยเขตหรืออำเภอ"]').value = idCardIssuedBy;
    document.querySelector('input[name="จังหวัด"]').value = province;
    document.querySelector('input[name="ที่อยู่ตามสำเนาทะเบียนบ้าน"]').value = address;
    document.querySelector('input[name="เลขที่"]').value = houseNumber;
    document.querySelector('input[name="หมู่ที่/หมู่บ้าน"]').value = village;
    document.querySelector('input[name="ตรอก/ซอย"]').value = alley;
    document.querySelector('input[name="เขต/อำเภอ"]').value = district;
    document.querySelector('input[name="รหัสไปรษณีย์"]').value = postalCode;
    document.querySelector('input[name="เบอร์โทรศัพท์บ้าน"]').value = homePhoneNumber;
    document.querySelector('input[name="ที่ปัจจุบัน"]').value = currentAddress;
    document.querySelector('input[name="บ้านเลขที่"]').value = currentHouseNumber;
    document.querySelector('input[name="หมู่ที่"]').value = currentVillage;
    document.querySelector('input[name="อาคารหมู่บ้าน"]').value = currentBuilding;
    document.querySelector('input[name="ตรอก ซอย"]').value = currentAlley;
  })
  .catch(function(err) {
    console.error(err);
    alert('ไม่สามารถแปลงรูปภาพเป็นข้อความได้ โปรดลองใหม่อีกครั้ง');
  });
}

// สร้างตัวฟังเหตุการณ์สำหรับปุ่มอัปโหลดรูปภาพ
document.querySelector('#upload-image-button').addEventListener('click', function() {
  // เปิดตัวเลือกไฟล์เพื่อให้ผู้ใช้เลือกรูปภาพ
  document.querySelector('#image-input').click();
});

// สร้างตัวฟังเหตุการณ์สำหรับอินพุตรูปภาพ
document.querySelector('#image-input').addEventListener('change', function() {
  // อ่านรูปภาพที่ผู้ใช้เลือก
  const reader = new FileReader();
  reader.onload = function() {
    // สร้างรูปภาพจากข้อมูลที่อ่านได้
    const image = new Image();
    image.onload = function() {
      // เรียกใช้ฟังก์ชันแปลงรูปภาพเป็นข้อความ
      convertImageToText(image);
    };
    image.src = reader.result;
  };
  reader.readAsDataURL(this.files[0]);
});
``

