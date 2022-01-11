-   CÁCH CÀI ĐẶT PHẦN GIAO DIỆN CHƯƠNG TRÌNH QUẢN LÝ NHÂN SỰ JAVA (SPRING BOOT)

*   Kiểm tra môi trường chạy ứng dụng
    -   Vào file: C:\Program Files> mở command line tại đây
    -   Kiểm tra môi trường node với câu lệnh: node -v + Enter
    -   Kiểm tra trình quản lý node với câu lệnh: npm -v + Enter
    -   Trong trường hợp báo không tìm thấy từ khóa node, điều đó cho thấy bạn chưa có môi trường node. Để cài đặt hãy vào trang chủ của node https://nodejs.org/en/download/ để download phiên bản phù hợp với máy. Sau đó mở file vừa tải về, nhấn chọn Next > nhấn chọn ô "I accept the terms in the Licence Agrreement" > Next > Next > > Next > Next Finish. Khi này bạn vào lại command line kiểm tra lại với lệnh "node -v" + Enter sẽ thấy phiên bản node được cài đặt
    -   Trong trường hợp không xem được phiên bản npm. Hãy gõ lệnh: npm install -g npm + Enter để cài đặt trình quản lý node.
*   Tải và mở source code giao diện:
    -   Ở trang repository https://github.com/EricNguyen1206/test-employee-management-application , ấn vào nút Code (màu xanh) > Download ZIP để tải về file nén suorce code chương trình.
    -   Giải nén folder chứa source code ra. Bạn sẽ thấy bên trong có các folder: public, src; file: pakage.json ...
    -   Lúc này sử dụng một IDE có terminal hoặc mở command line và cd tới folder vừa giải nén.
    -   Để chương trình chạy được, bạn phải gõ lệnh command npm install npm để cài folder node_modules đúng phiên bản với cấu hình package.json.
    -   Lúc này mọi thứ gần như đã hoàn thành. Bạn chỉ cần start server java spring boot sau đó mở giao diện lên với lệnh npm start, đợi đến khi trang web được bật trên trình duyệt là thành công. Chúc bạn may mắn!

-   CHI TIẾT CẬP NHẬT NGÀY 16/12/2021

*   Thêm các Components cho view Department, Employee
    -   Thêm ListDepartments.jsx, ListEmployees.jsx, UpdateDepartment.jsx, UpdateEmployee.jsx
*   Thêm thư viện react-router-dom và chia đường dẫn

-   CHI TIẾT CẬP NHẬT NGÀY 29/12/2021

*   Thêm giao diện ViewDepartment.jsx
    -   Danh sách employee được thể hiện dưới dạng bảng
*   Thêm cập nhật thông tin Department:
    -   Cho thêm manager từ một employee trong department
    -   Cho phép thay đổi manager
    -   Cho phép xóa manager

-   CHI TIẾT CẬP NHẬT NGÀY 3/1/2022

*   Thay đổi trường thông tin department
    -   loại bỏ trường basicSalary
    -   thêm trường maxEmployee khi tạo mới
    -   thêm trường numberOfEmployees
    -   tự động tăng numberOfEmployees khi thêm employee
*   Thêm tính năng khi xóa Department
    -   khi xóa department thì các employee được setDepartment lại là 0
    -   manager của department được set lại role là nhân viên

-   CHI TIẾT CẬP NHẬT NGÀY 10/1/2022:

*   file UpdateEmployee.jsx: cập nhật thêm phát tín hiệu pop-up báo lỗi ở các trường hợp:
    -   không trùng email, số điện thoại khi tạo mới hoặc cập nhật dữ liệu employee
    -   số điện thoại phải đúng pattent bắt đầu với số 0 và có 10 chữ số tất cả
*   file UpdateDepartment.jsx: cập nhật pop-up báo lỗi các trường hợp:
    -   không trùng tên department khi tạo mới
    -   không được để số employee tối đa bằng 0 khi tạo mới
    -   không cập nhật lại số employee tối đa nhỏ hơn

-   CHI TIẾT CẬP NHẬT NGÀY 11/1/2022

*   Thêm giao diện dashboard cho chương trình
    -   Thêm file ViewDashboard.jsx
    -   Thêm CDN fontawesome để dùng các icon cho giao diện (file ./public/index.html)
*   Thay đổi theme chương trìnha
    -   Thêm css vào file App.css
    -   Chỉnh lại màu nền chính
    -   Thống nhất về giao diện các table (nền trắng, hover)
    -   Thay đổi button thêm department và thêm employee
