# AI-Project

\*\*\*\* Cách chạy

- Cài go live extension trên vscode
- Ấn "Go live"

\*\*\*\* Cách thêm điểm

- Mở openstreetmap: https://www.openstreetmap.org/relation/11367565#map=17/21.03478/105.81040
- Chọn các giao điểm trên bản đồ, chuột phải chọn Show address
- Lấy tọa độ, tạo 1 object trong mảng data, cấu trúc
  {
  id: ...
  coor :[paste tọa độ vào đây]
  }

Nó sẽ tự động hiển thị đánh dấu trên bản đồ, hover chuột vào là thấy id

# Cách thêm cạnh

Thêm cạnh vào file edge.json,

1. lấy id 2 điểm cho vào mảng con theo format [diem_dau, diem_cuoi]
2. Thêm mảng con đó vào mảng lớn
