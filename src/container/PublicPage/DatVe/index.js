import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box, Button } from '@mui/material';
import Ghe from './_component/Ghe';
import './_assets/style.css';
import { actPhongVeGetData } from './modules/action';
import Loader from '../components/Loader';
import { useHistory } from 'react-router-dom';

export default function DatVe(props) {

    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        const { maPhim } = props.match.params;
        dispatch(actPhongVeGetData(maPhim));
    }, [])

    const loading = useSelector(state => state.datVeReducer.loading);
    const dataPhongVe = useSelector(state => state.datVeReducer.dataPhongVe);
    const danhSachGheChon = useSelector(state => state.datVeReducer.danhSachGheChon)


    const renderGhe = (dataPhongVe) => dataPhongVe?.content?.danhSachGhe?.map(ghe => <Ghe key={ghe.tenGhe} daDat={ghe.daDat} value={ghe.tenGhe} ghe={ghe}></Ghe>)

    const renderGheChon = (danhSachGheChon) => {
        let gheChonArr = null;
        danhSachGheChon?.forEach(gheChon => {
            if (!gheChonArr) {
                gheChonArr = `${gheChon.tenGhe}`;
            } else {
                gheChonArr += `, ${gheChon.tenGhe}`;
            }
        })
        return gheChonArr;
    }

    const renderTongTien = (danhSachGheChon) => {
        let tong = 0;
        danhSachGheChon?.forEach(gheChon => {
            tong += gheChon.giaVe;
        })
        return tong;
    }

    if (!localStorage.getItem('GeneralUser')) {
        history.replace('/dang-nhap');
    }

    if (loading) return <Loader />
    return (

        < Fragment >
            <Box sx={{ width: '100%', bgcolor: '#06121e' }}>
                <Box sx={{ height: 106, backgroundImage: 'url("/images/uploads/ft-bg.jpg")' }}></Box>
                <Container maxWidth='lg' sx={{ py: 5 }}>
                    <h2 style={{
                        fontFamily: '"Dosis", sans-serif',
                        fontSize: 24,
                        color: '#fff',
                        marginBottom: 15
                    }}>
                        #CH???N GH???:
                    </h2>
                    <div className='row'>
                        <div className='col-lg-9'>
                            <Box sx={{ py: 3, bgcolor: '#fff', overflow: { xs: 'scroll', md: 'hidden' }, marginBottom: 5 }}>
                                <Box sx={{ width: 700, mx: 'auto' }}>
                                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(16, 1fr)', px: '140px' }}>
                                        {renderGhe(dataPhongVe)}
                                    </Box>
                                    <span id='screen'>M??n h??nh</span>
                                    <div className='d-flex justify-content-center container-fluid'>
                                        <span className='ghe gheDangChon'>Gh??? ??ang ch???n</span>
                                        <span className='ghe gheDaDat'>Gh??? ???? ?????t</span>
                                        <span className='ghe gheTrong'>Gh??? tr???ng</span>
                                    </div>
                                </Box>
                            </Box>
                        </div>
                        <div className='col-lg-3'>
                            <h3 className='chiTietHeading'>Chi ti???t ?????t v??</h3>
                            <p className='chiTiet chiTietTitle'>{dataPhongVe?.content.thongTinPhim.tenPhim}</p>
                            <div className='chiTiet'>
                                <span>C???m R???p: </span>
                                <span>{dataPhongVe?.content.thongTinPhim.tenCumRap}</span>
                            </div>
                            <div className='chiTiet'>
                                <span>R???p: </span>
                                <span>{dataPhongVe?.content.thongTinPhim.tenRap}</span>
                            </div>
                            <div className='chiTiet'>
                                <span>Su???t chi???u: </span>
                                <span>{`${dataPhongVe?.content.thongTinPhim.gioChieu} | ${dataPhongVe?.content.thongTinPhim.ngayChieu}`}</span>
                            </div>
                            <div className='chiTiet'>
                                <span>Gh???:</span>
                                <span>{renderGheChon(danhSachGheChon)}</span>
                            </div>
                            <div className='chiTiet'>
                                <span>T???ng:</span>
                                <span>{renderTongTien(danhSachGheChon)} VN??</span>
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <Button sx={{
                                    width: '100%',
                                    height: '30px',
                                    py: 3,
                                    bgcolor: '#dd003f',
                                    color: '#fff',
                                    fontFamily: '"Dosis", sans-serif',
                                    fontSize: '24px',
                                    fontWeight: 700,
                                    '&:hover': {
                                        bgcolor: '#dcf836',
                                        color: '#06121e'
                                    }
                                }}>
                                    MUA V??
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </Box>
        </ Fragment >
    )
}
