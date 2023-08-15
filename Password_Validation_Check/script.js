const passwordInput =document.querySelector(".pass-field input");
const eyeIcon =document.querySelector(".pass-field i");
const requirmentList=document.querySelectorAll(".requirement-list li")
// Một loạt các yêu cầu mật khẩu với tương ứng
//   biểu thức chính quy và chỉ mục của mục danh sách yêu cầu
const requirements=[
    { regex: /.{8,}/, index: 0 }, // Tối thiểu 8 ký tự
    { regex: /[0-9]/, index: 1 }, // Ít nhất một số
    { regex: /[a-z]/, index: 2 }, // Ít nhất một chữ thường
    { regex: /[^A-Za-z0-9]/, index: 3 }, // ít nhất một ký tự đặc biệt
    { regex: /[A-Z]/, index: 4 }, // Ít nhất một chữ cái viết hoa
]
passwordInput.addEventListener("keyup",(e)=>{
    requirements.forEach(item =>{
        // Kiểm tra xem mật khẩu có khớp với regex yêu cầu không
        const isValid=item.regex.test(e.target.value);
        const requirementsItem=requirmentList[item.index];

        // Cập nhật hạng và biểu tượng của mục yêu cầu nếu phù hợp yêu cầu hay không
        if(isValid){
            requirementsItem.firstElementChild.className="fa-solid fa-check";
            requirementsItem.classList.add("valid");
        }else{
            requirementsItem.firstElementChild.className="fa-solid fa-circle";
            requirementsItem.classList.remove("valid");
        }
    })
});



eyeIcon.addEventListener("click",() =>{
    //Chuyển đổi kiểu nhập mật khẩu giữa "mật khẩu" và "văn bản"
    passwordInput.type = passwordInput.type==="password" ? "text":"password";

    //Cập nhật lớp biểu tượng con mắt dựa trên kiểu nhập mật khẩu
    eyeIcon.className=`fa-solid fa-eye${passwordInput.type==="password" ? "":"-slash"}`;

    
});