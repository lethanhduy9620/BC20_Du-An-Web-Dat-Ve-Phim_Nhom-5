import React, { useEffect, useRef, useState } from 'react';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from "react-redux";
import { actFetchChiTietPhim } from './modules/actions';
import LichChieu from '../LichChieu';
import { actFetchLichChieuPhim } from '../LichChieu/modules/actions';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function ChiTietPhim(props) {
    const loading = useSelector((state) => state.chiTietPhimReducer.loading);
    const data = useSelector((state) => state.chiTietPhimReducer.data);
    const dispatch = useDispatch();
    const { id } = props.match.params;

    //DOM Lich Chieu Container
    const lichChieuEvent = useRef(null);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(actFetchChiTietPhim(id))
    }, []);

    const onClickMuaVeBtn = () => {
        lichChieuEvent.current.classList.remove('hidden');
        dispatch(actFetchLichChieuPhim(id));
    }

    const renderNgayChieuPhim = () => {
        let ngayKhoiChieu = "Lorem ipsum";
        if (data?.ngayKhoiChieu) {
            ngayKhoiChieu = new Date(Date.parse(data.ngayKhoiChieu));
            ngayKhoiChieu = `${ngayKhoiChieu.getDate()}/${ngayKhoiChieu.getMonth() + 1
                }/${ngayKhoiChieu.getFullYear()}`;
        }
        return ngayKhoiChieu
    }

    const renderNoiDungPhim = () => {
        let noiDung = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla saepe beatae qui";
        if (data?.moTa) {
            noiDung = data?.moTa.replace("<p>", "").replace("</p>", "");
        }
        return noiDung;
    }

    if (loading) return <Loader />
    return (
        <>
            <div className="page-single page-single-cyber" >
                <div className="container">
                    <div className="row ipad-width2">
                        <div className="col-md-4 col-sm-12 col-xs-12">
                            <div className="movie-img movie-img-cyber">
                                {/* L??m th??m hi???u ???ng click v??o h??nh s??? m??? ra khung chi???u trail??? v???i ???????ng d???n ???????c l???y t??? youtube */}
                                <img src={data?.hinhAnh} alt="" />
                            </div>
                        </div>
                        <div className="col-md-8 col-sm-12 col-xs-12">
                            <div className="movie-single-ct main-content text-white">
                                <h1 className="bd-hd">{data?.tenPhim}</h1>
                                <ul>
                                    <li> ????nh gi??: <span >{data?.danhGia}</span>
                                    </li>
                                    <li> Ng??y kh???i chi???u: <span>{renderNgayChieuPhim()}</span>
                                    </li>
                                    <li> ?????o di???n:<span> Lorem, ipsum</span>
                                    </li>
                                    <li> Di???n vi??n:<span> Lorem ipsum dolor sit amet consectetur</span> </li>
                                    <li> Th??? lo???i:<span> Lorem ipsum dolor sit amet consectetur</span> </li>
                                    <li> Th???i l?????ng:<span> Lorem ipsum</span> </li>
                                    <li> Ng??n ng???:<span> Lorem ipsum dolor sit amet consectetur</span> </li>
                                    <li> Rated: <span> Lorem ipsum dolor sit amet consectetur</span> </li>
                                </ul>
                                {data?.sapChieu !== true && <button className='btn btn-success btn-cyber' onClick={onClickMuaVeBtn}>Mua V??</button>}
                            </div>
                        </div>
                    </div>
                    <div className="movie-description-cyber text-white">
                        <h3 className='title-cyber'>N???i dung phim</h3>
                        <p class="describe-cyber">
                            {renderNoiDungPhim()}
                        </p>
                    </div>
                </div>
            </div>
            <LichChieu ref={lichChieuEvent} props={props} />
        </>
    );
}
