function getOneBook(id) {
  return $.ajax({
    method: "GET",
    url: `/api/book/${id}`,
    contentType: "application/json",
    error: (error) => {
      console.error(error);
    },
  });
}

function updateBook(id, status) {
  return $.ajax({
    method: "PUT",
    url: `/api/book/${id}`,
    data: JSON.stringify({ status: status }),
    contentType: "application/json",
    success: () => {
      window.location.href = "/";
    },
    error: (error) => {
      console.error(error);
    },
  });
}

function deleteBook(id) {
  return $.ajax({
    method: "DELETE",
    url: `/api/book/${id}`,
    contentType: "application/json",
    caches: false,
    success: () => {
      window.location.href = "/";
    },
    error: (error) => {
      console.error(error);
    },
  });
}
