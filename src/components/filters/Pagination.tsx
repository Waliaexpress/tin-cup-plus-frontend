import { ArrowLeftIcon, ArrowRightIcon } from "@/assets/icons";
import { useMediaQuery } from "@/hooks";


interface PaginationProps {
  pagination: any;
  changeRoute: (newQueries: any) => void;
  section: string;
  client?: boolean; // Optional prop
}

export default function Pagination({ pagination, changeRoute, section, client = false }: PaginationProps) {
  const { currentPage, nextPage, previousPage, hasNextPage, hasPreviousPage, lastPage } = pagination;
  const isDesktop = useMediaQuery("(min-width:1024px)");

  const scrollToTop = () => {
    const element = document.getElementById(section);
    if (element) {
      const scrollY = client && isDesktop ? element.offsetTop - 115 : element.offsetTop;
      window.scrollTo({ top: scrollY, behavior: "smooth" });
    }
  };

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

        {/* First Page */}
        {currentPage !== 1 && previousPage !== 1 && (
          <li
            className="min-w-8 h-8 flex items-center justify-center px-2 rounded-md text-gray-600 hover:bg-violet-100 hover:text-violet-600 cursor-pointer transition-all duration-200"
            onClick={() => {
              changeRoute({ page: 1 });
              scrollToTop();
            }}
          >
            1
          </li>
        )}
        {hasPreviousPage && previousPage !== 1 && (
          <li className="px-2 text-gray-500">...</li>
        )}

        {/* Previous Page Number */}
        {hasPreviousPage && (
          <li
            className="min-w-8 h-8 flex items-center justify-center px-2 rounded-md text-gray-600 hover:bg-violet-100 hover:text-violet-600 cursor-pointer transition-all duration-200"
            onClick={() => {
              changeRoute({ page: previousPage });
              scrollToTop();
            }}
          >
            {previousPage}
          </li>
        )}

        {/* Current Page */}
        <li className="min-w-8 h-8 flex items-center justify-center px-2 rounded-md bg-violet-600 text-white font-semibold">
          {currentPage}
        </li>

        {/* Next Page Number */}
        {hasNextPage && (
          <li
            className="min-w-8 h-8 flex items-center justify-center px-2 rounded-md text-gray-600 hover:bg-violet-100 hover:text-violet-600 cursor-pointer transition-all duration-200"
            onClick={() => {
              changeRoute({ page: nextPage });
              scrollToTop();
            }}
          >
            {nextPage}
          </li>
        )}
        {hasNextPage && nextPage !== lastPage && (
          <li className="px-2 text-gray-500">...</li>
        )}

        {/* Last Page */}
        {lastPage !== currentPage && lastPage !== nextPage && (
          <li
            className="min-w-8 h-8 flex items-center justify-center px-2 rounded-md text-gray-600 hover:bg-violet-100 hover:text-violet-600 cursor-pointer transition-all duration-200"
            onClick={() => {
              changeRoute({ page: lastPage });
              scrollToTop();
            }}
          >
            {lastPage}
          </li>
        )}

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