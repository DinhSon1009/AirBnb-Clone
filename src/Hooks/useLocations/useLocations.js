import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import httpServ from "../../services/http.service";

function useLocations() {
  const [locations, setLocations] = useState(null); //top dia diem co nhieu phong nhat

  const layDanhSachDiaDiem = useCallback(async () => {
    let result = [];
    let allResult = await httpServ.layDanhSachDiaDiem();
    await Promise.all(
      allResult.data.map(async (diaDiem) => {
        const response = await httpServ.layDanhSachPhongChoThueTheoViTri(
          diaDiem._id
        );
        result.push({
          ...response,
          locationId: diaDiem._id,
          location: `${diaDiem.name}, ${diaDiem.province}`,
        });
      })
    );
    result.sort((a, b) => b.data.length - a.data.length);
    setLocations(result);
  }, []);

  useEffect(() => {
    layDanhSachDiaDiem();
  }, []);

  return {
    locations,
  };
}

export default useLocations;
