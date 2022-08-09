import useSWR, { useSWRConfig } from "swr"
import styles from "../../../styles/mypage/_main.module.css"

import Title from "./_title"


const fetcher = (url) => {
    // console.log('URL:', url, typeof url)
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        // console.log(res)
        return res.json()
    })
}

function SelectLecture(){
    const { mutate } = useSWRConfig()
    const user_id = "62a9a23fd5ca81cddd59604b" // user _id
    const { data, error } = useSWR(`/api/lecture/${user_id}`, fetcher)

    if (error) return <div>Getting Lectures Failed</div>
    if (!data) return <div>Loading...</div>

    // https://swr.vercel.app/ko/docs/mutation#현재-데이터를-기반으로-뮤테이트
    async function onDelete(_id) {

        const newList =  await fetch(`/api/lecture/${user_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lecture_id: _id }),
        })

        mutate(`/api/lecture/${user_id}`);
        
    }

    return(
        <div className={styles.section_bg}>
            <div style={{justifyContent:"space-between"}} className={styles.section_title_bg}>
                <div className={styles.section_title}>과목선택</div>
                <div style={{width:"50%", columnGap:"5%", display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                <button style={{borderRadius:20}} class="btn btn-secondary btn-sm" type="button">이번 학기 과목만 보기</button>
                <button style={{borderRadius:20}} class="btn btn-outline-secondary btn-sm" type="button">모든 과목 보기</button>
                </div>
            </div>
            <div style={{width:"100%"}} class="row">
                {
                    data.lectures.map((lecture) => {
                    return (
                        <div class="col-6">
                        <div className={styles.lecture}>
                            <div className={styles.lecture_name}>
                                <div className={styles.lecture_name_1}>{lecture.name}</div>
                                <div className={styles.lecture_name_2}>
                                <div className={styles.lecture_open}>{lecture.open}</div>
                                </div>
                            </div>
                            <div className={styles.lecture_prof}>{lecture.professor}</div>
                            <div className={styles.lecture_id}>{lecture.classnumber}</div>
                        </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

function Objection(){
    return (
        <div className={styles.section_bg}>
            <div className={styles.section_title_bg}>
                <div className={styles.section_title}>이의제기</div>
            </div>

            <div style={{width:"100%"}} class="shadow-sm">
            <div className={styles.objection}>
                <div className={styles.objection_1}>과목</div>
                <div className={styles.objection_2}>날짜</div>
                <div className={styles.objection_2}>교수자</div>
                <div className={styles.objection_2}>확인여부</div>
                <div className={styles.objection_2}>답장보기</div>
            </div>
            </div>

            <div style={{width:"100%"}}>
            <div className={styles.objection}>
                <div className={styles.objection_1}>알고리즘 주차과제: 9주차</div>
                <div className={styles.objection_2}>2021.04.18</div>
                <div className={styles.objection_3}>홍길동</div>
                <div className={styles.objection_2}>확인</div>
                <div className={styles.objection_2}>
                    <button style={{fontSize:"small", display:"flex", alignItems:"center",height:"100%", borderRadius:5}} class="btn btn-primary" type="button">답변보기</button>
                </div>
            </div>
            <div className={styles.objection}>
                <div className={styles.objection_1}>알고리즘 주차과제: 9주차</div>
                <div className={styles.objection_2}>2021.04.18</div>
                <div className={styles.objection_3}>홍길동</div>
                <div className={styles.objection_2}>확인</div>
                <div className={styles.objection_2}>
                    <button style={{fontSize:"small", display:"flex", alignItems:"center",height:"100%", borderRadius:5}} class="btn btn-primary" type="button">답변보기</button>
                </div>
            </div>
            </div>
        </div>
    )
}

// _1 마이페이지
// _2 내 성적관리
// _3 나의 피드백
// _4 내 과제관리
// _5 계정관리
// _6 환경설정
// _7 문의하기

export default function MyAssignment() {
    return (
        <div className={styles.content}>

            <Title mode={4}/>
            
            <SelectLecture/>
            <Objection/>
            
        </div>
    )
}