import { ArrowLeftIcon, ArrowRightIcon } from "@/assets/icons";
import { useMediaQuery } from "@/hooks";


interface PaginationProps {
  pagination: any;
  changeRoute: (newQueries: any) => void;
  section: string;
  client?: boolean; // Optional prop
}

export default function Pagination({ pagination, changeRoute, section, client = false }: PaginationProps) {
  const { currentPage, nextPage, previousPage, hasNextPage, hasPreviousPage, lastPage, total } = pagination;
  const isDesktop = useMediaQuery("(min-width:1024px)");

  const scrollToTop = () => {
    const element = document.getElementById(section);
    if (element) {
      const scrollY = client && isDesktop ? element.offsetTop - 115 : element.offsetTop;
      window.scrollTo({ top: scrollY, behavior: "smooth" });
    }
  };
  
  // Generate an array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Maximum number of page numbers to show
    
    if (lastPage <= maxPagesToShow) {
      // If we have fewer pages than the max, show all pages
      for (let i = 1; i <= lastPage; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      // Calculate start and end of page range around current page
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(lastPage - 1, currentPage + 1);
      
      // Adjust if we're at the beginning
      if (currentPage <= 3) {
        endPage = Math.min(4, lastPage - 1);
      }
      
      // Adjust if we're at the end
      if (currentPage >= lastPage - 2) {
        startPage = Math.max(2, lastPage - 3);
      }
      
      // Add ellipsis before start page if needed
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Add page numbers in range
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis after end page if needed
      if (endPage < lastPage - 1) {
        pageNumbers.push('...');
      }
      
      // Always include last page
      pageNumbers.push(lastPage);
    }
    
    return pageNumbers;
  };
  
  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex justify-center mt-8 mb-4">
      <ul className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg shadow-sm">
        {/* Previous Page */}
        {hasPreviousPage && (
          <li
            className="flex items-center px-3 py-2 text-violet-600 hover:text-violet-800 cursor-pointer transition-colors duration-200"
            onClick={() => {
              changeRoute({ page: previousPage });
              scrollToTop();
            }}
          >
            <ArrowLeftIcon className="w-5 h-5 mr-1" />
            <span className="hidden sm:inline">Previous</span>
          </li>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((pageNumber, index) => {
          // If it's an ellipsis
          if (pageNumber === '...') {
            return <li key={`ellipsis-${index}`} className="px-2 text-gray-500">...</li>;
          }
          
          // If it's the current page
          if (pageNumber === currentPage) {
            return (
              <li key={`page-${pageNumber}`} className="min-w-8 h-8 flex items-center justify-center px-2 rounded-md bg-violet-600 text-white font-semibold">
                {pageNumber}
              </li>
            );
          }
          
          // If it's any other page number
          return (
            <li
              key={`page-${pageNumber}`}
              className="min-w-8 h-8 flex items-center justify-center px-2 rounded-md text-gray-600 hover:bg-violet-100 hover:text-violet-600 cursor-pointer transition-all duration-200"
              onClick={() => {
                changeRoute({ page: pageNumber });
                scrollToTop();
              }}
            >
              {pageNumber}
            </li>
          );
        })}


        {/* Next Page */}
        {hasNextPage && (
          <li
            className="flex items-center px-3 py-2 text-violet-600 hover:text-violet-800 cursor-pointer transition-colors duration-200"
            onClick={() => {
              changeRoute({ page: nextPage });
              scrollToTop();
            }}
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRightIcon className="w-5 h-5 ml-1" />
          </li>
        )}
      </ul>
    </nav>
  );
}