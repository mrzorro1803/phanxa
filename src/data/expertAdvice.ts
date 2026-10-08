export interface QuickPrompt {
  id: string;
  label: string;
  query: string;
  response: string;
}

export const QUICK_PROMPTS: QuickPrompt[] = [
  {
    id: 'urge_now',
    label: '🔥 Đang rất thèm thủ dâm, làm sao vượt qua?',
    query: 'Tôi đang rất thèm thủ dâm và xem phim khiêu dâm ngay lúc này, làm sao vượt qua?',
    response: `Chào bạn, tôi rất hiểu cảm giác bứt rứt dữ dội bạn đang trải qua lúc này. Hãy nhớ: **Đây không phải là ham muốn sinh lý thuần túy, mà là cơn đói Dopamine của não bộ!**

Hãy thực hiện ngay giao thức cấp cứu 3 bước sau:
1. **Rời khỏi vị trí hiện tại ngay lập tức:** Đứng dậy, đi ra khỏi phòng kín hoặc giường ngủ.
2. **Uống một cốc nước thật lạnh:** Nước lạnh làm hạ nhiệt độ cơ thể, kích thích dây thần kinh phế vị (Vagus Nerve) chuyển hệ thần kinh từ trạng thái "kích động" sang "thư giãn".
3. **Thực hiện 15 cái chống đẩy hoặc bật nhảy:** Chuyển hướng lưu lượng máu từ vùng chậu về các nhóm cơ lớn (tay, chân, ngực).

Khoa học thần kinh đã chứng minh: **Cơn sóng thèm Dopamine chỉ đạt đỉnh trong khoảng 7 - 12 phút**. Nếu bạn trì hoãn được 10 phút, xung động sẽ tự hạ nhiệt. Hãy bấm **"Nút Cấp Cứu"** trên màn hình để tôi đồng hành cùng bạn đếm ngược!`,
  },
  {
    id: 'delay_technique',
    label: '⏳ Hướng dẫn bài tập trì hoãn não bộ',
    query: 'Hướng dẫn tôi chi tiết cách thực hiện bài tập trì hoãn não bộ (Urge Surfing)?',
    response: `Bài tập **"Trì hoãn 10 phút" (Urge Surfing - Lướt sóng xung động)** là công cụ thần kinh học mạnh mẽ nhất để tái huấn luyện Thùy trán (Prefrontal Cortex):

1. **Hiểu bản chất:** Khi cơn thèm xuất hiện, não bạn nghĩ rằng "nếu không làm thì sẽ khó chịu mãi". Nhưng sự thật, xung động như một ngọn sóng: dâng lên -> đạt đỉnh -> tự xẹp xuống.
2. **Kỹ thuật lướt sóng:**
   - Đặt đồng hồ đếm ngược 10 phút (vào tab **Luyện não** để mở bộ đếm).
   - Ngồi thẳng lưng, nhắm mắt và **quan sát cảm giác** (tim đập nhanh ở đâu, bụng thắt chỗ nào, tay bồn chồn ra sao) với tư cách một người quan sát trung lập, không phán xét, không cắn răng chống cự.
   - Hít thở sâu bằng bụng: Hít vào 4 giây phình bụng, thở ra chậm 6 giây xẹp bụng.
3. **Kết quả:** Sau 10 phút, nồng độ Dopamine kích động hạ xuống. Bạn nhận ra mình hoàn toàn kiểm soát được cơ thể mà không cần đầu hàng!`,
  },
  {
    id: 'scale_7',
    label: '🎯 Thang đo kích thích mức 7 là gì?',
    query: 'Thang đo kích thích mức 7 là gì và làm sao để nhận diện và dừng đúng lúc?',
    response: `Thang đo kích thích (Arousal Scale) từ 1 đến 10 là chìa khóa vàng trong điều trị xuất tinh sớm và làm chủ phản xạ sinh lý:

- **Mức 1 - 3:** Trạng thái thư giãn, nhịp tim bình thường (Hệ phó giao cảm chi phối).
- **Mức 4 - 6:** Cương cứng, hưng phấn tăng dần, bạn hoàn toàn làm chủ nhịp điệu.
- **MỨC 7 - ĐIỂM DỪNG VÀNG (The Plateau Threshold):**
  * Dấu hiệu nhận biết: Hơi thở bắt đầu dồn dập, cơ đáy chậu (vùng hậu môn - bìu) bắt đầu tự động siết nhẹ, tinh hoàn co rút lên sát cơ thể.
  * **Hành động bắt buộc:** DỪNG KÍCH THÍCH NGAY LẬP TỨC. Giữ yên, hít một hơi thật sâu xuống đáy bụng để thả lỏng hoàn toàn cơ đáy chậu trong 20-30 giây cho đến khi mức độ kích thích hạ về 5 hoặc 6.
- **Mức 8 - 9 (Điểm không thể quay đầu - Inevitability):** Tuyến tiền liệt co bóp, phản xạ phóng tinh đã truyền tín hiệu qua tủy sống, bạn không thể dừng lại được nữa.

Luyện tập nhận diện Mức 7 sẽ giúp bạn kéo dài thời gian theo ý muốn mà không cần dùng thuốc!`,
  },
  {
    id: 'performance_anxiety',
    label: '😰 Tôi lo lắng trước khi quan hệ',
    query: 'Tôi bị lo âu hiệu suất (Performance Anxiety), tim đập nhanh và sợ thất bại khi quan hệ?',
    response: `Lo âu hiệu suất (Performance Anxiety) là nguyên nhân hàng đầu gây ra cả xuất tinh sớm và rối loạn cương dương ở nam giới trẻ tuổi:

1. **Cơ chế:** Khi bạn lo lắng "liệu mình có bị nhanh không", não phát tín hiệu nguy hiểm, tuyến thượng thận giải phóng **Adrenaline và Cortisol**. Adrenaline co thắt mạch máu dương vật và kích hoạt phản xạ xuất tinh khẩn cấp.
2. **Cách hóa giải:**
   - **Chuyển từ "Người trình diễn" sang "Người trải nghiệm":** Đừng biến cuộc yêu thành bài thi kiểm tra. Hãy tập trung 100% xúc giác vào da thịt, ánh mắt, hơi ấm của bạn tình thay vì liên tục kiểm tra độ cương của bản thân.
   - **Thở nhịp 4-7-8:** Hít vào 4 giây, nín thở 7 giây, thở ra từ từ qua miệng 8 giây. Chỉ sau 3 chu kỳ, nhịp tim sẽ giảm ngay 15-20 nhịp/phút.
   - **Kích hoạt Neo tâm lý tự tin:** Bấm ngón tay cái và ngón trỏ lại, kích hoạt cảm xúc kiêu hãnh bạn đã rèn luyện trong app!`,
  },
  {
    id: 'recovery_12weeks',
    label: '📈 Lợi ích sau 12 tuần phục hồi là gì?',
    query: 'Lợi ích thần kinh và sinh lý sau khi hoàn thành lộ trình 12 tuần là gì?',
    response: `Lộ trình 12 tuần dựa trên nguyên lý **Tái tạo thần kinh (Neuroplasticity)** mang lại những biến chuyển vượt bậc:

- **Tuần 1 - 2:** Cắt đứt sự phụ thuộc siêu kích thích. Giảm tình trạng mệt mỏi sau phóng tinh (Post-ejaculatory brain fog).
- **Tuần 3 - 4:** Số lượng thụ thể Dopamine D2 trong não tăng sinh trở lại. Bạn tìm lại sự nhạy cảm, niềm vui với cuộc sống đời thực và ánh nhìn phụ nữ ngoài đời.
- **Tuần 5 - 8:** Nhóm cơ đáy chậu (PC) săn chắc và linh hoạt gấp 2 lần. Bạn cảm nhận rõ rệt thang đo kích thích và bắt đầu làm chủ được nhịp dừng số 7.
- **Tuần 9 - 12:** Khả năng kiểm soát xuất tinh chủ động, thời gian duy trì tăng tự nhiên từ 3-5 lần, tự tin bản lĩnh đàn ông được khôi phục trọn vẹn!`,
  },
];

export function getDoctorResponse(userText: string): string {
  const text = userText.toLowerCase().trim();

  if (text.includes('thèm') || text.includes('muốn xem') || text.includes('porn') || text.includes('thủ dâm') || text.includes('quay tay')) {
    return QUICK_PROMPTS[0].response;
  }
  if (text.includes('trì hoãn') || text.includes('não bộ') || text.includes('10 phút') || text.includes('urge')) {
    return QUICK_PROMPTS[1].response;
  }
  if (text.includes('mức 7') || text.includes('thang đo') || text.includes('ngưỡng') || text.includes('dừng')) {
    return QUICK_PROMPTS[2].response;
  }
  if (text.includes('lo lắng') || text.includes('sợ') || text.includes('tâm lý') || text.includes('cương') || text.includes('anxiety')) {
    return QUICK_PROMPTS[3].response;
  }
  if (text.includes('12 tuần') || text.includes('lợi ích') || text.includes('bao lâu') || text.includes('kết quả')) {
    return QUICK_PROMPTS[4].response;
  }
  if (text.includes('kegel') || text.includes('cơ đáy chậu') || text.includes('cơ pc')) {
    return `Bài tập Kegel (huấn luyện cơ đáy chậu Pubococcygeus - PC) là nền tảng thể chất của việc kiểm soát xuất tinh:
1. **Cách định vị cơ PC:** Tưởng tượng bạn đang đi tiểu giữa chừng và chủ động ngắt dòng nước tiểu lại. Nhóm cơ siết chặt đó chính là cơ PC.
2. **Quy tắc vàng:** Trong khi siết cơ PC, **bụng dưới, đùi và mông phải hoàn toàn thả lỏng**. Đừng nín thở.
3. **Liều lượng:** Tập 3 hiệp mỗi ngày theo đúng bộ đếm trong tab **Luyện não** (Co 5s - Thả 5s x 10 nhịp).
Lưu ý quan trọng: Khả năng THẢ LỎNG cơ PC cũng quan trọng ngang với khả năng CO THẮT!`;
  }
  if (text.includes('mộng tinh') || text.includes('xuất tinh trong đêm')) {
    return `Mộng tinh (Wet Dream) là hiện tượng sinh lý hoàn toàn tự nhiên và lành mạnh!
Khi bạn kiêng thủ dâm, túi tinh tích lũy đầy và cơ thể tự động giải phóng lượng tinh dịch dư thừa trong khi ngủ. Đây là tín hiệu hệ sinh sản của bạn đang hoạt động bình thường, **không làm đứt chuỗi Streak** và không gây suy giảm năng lượng như thủ dâm trước màn hình kích thích. Hãy vui mừng vì cơ thể bạn đang tự thanh lọc!`;
  }

  return `Bác sĩ ghi nhận thắc mắc của bạn: "${userText}".
Về mặt sinh lý thần kinh, việc phục hồi bản lĩnh nam giới cần sự phối hợp nhịp nhàng giữa:
1. **Kiểm soát Dopamine:** Nói KHÔNG với nội dung khiêu dâm để thụ thể não bộ nhạy bén trở lại.
2. **Luyện tập cơ đáy chậu (Kegel):** Tạo sức mạnh nâng đỡ và phản xạ co nhả nhịp nhàng.
3. **Điều hòa hơi thở:** Luôn duy trì thở bụng sâu để giữ hệ thần kinh ở chế độ phó giao cảm (bình tĩnh).
4. **Kỷ luật tâm lý:** Thực hiện đủ 4 nhiệm vụ hàng ngày trong Dashboard.

Bạn có thể bấm vào các câu hỏi gợi ý nhanh phía dưới hoặc hỏi chi tiết hơn về cảm giác bạn đang gặp nhé!`;
}
