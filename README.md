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
