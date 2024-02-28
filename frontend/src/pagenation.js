import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, Card } from 'react-bootstrap'; // Pagination 및 Card 컴포넌트를 사용하기 위해 import 추가
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 CSS 파일 import

function PaginationComponent() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수 추가

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/post2?page=${currentPage}`);
      setPosts(response.data.post);
      setTotalPages(response.data.totalPages); // 서버에서 전체 페이지 수를 받아와 설정
    } catch (error) {
      console.error('게시물을 불러오는데 실패했습니다.', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="pagination-container text-center"> {/* text-center 클래스 추가 */}
      <h2 className="mb-4">게시물 목록</h2>
      <div className="card-container"> {/* card 컨테이너 추가 */}
        {posts.map((post) => (
          <Card key={post.post_id} className="mb-3"> {/* Card 컴포넌트 사용 */}
            <Card.Body>
              <Card.Title>{post.title}</Card.Title> {/* Card.Title로 제목 추가 */}
              <Card.Text>{post.content}</Card.Text> {/* Card.Text로 내용 추가 */}
            </Card.Body>
          </Card>
        ))}
      </div>

      <div className="pagination d-flex justify-content-center"> {/* d-flex justify-content-center 클래스 추가 */}
        <Pagination>
          <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item key={index + 1} active={currentPage === index + 1} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} />
        </Pagination>
      </div>
    </div>
  );
}

export default PaginationComponent;
