'use client';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { API_ENDPOINTS, QUERY_KEYS } from '@/constant/api-endpoints';
import { ApiResponse, useApiMutation, useApiQuery } from '@/hooks/use-api';
import { usePagination } from '@/hooks/use-pagination';
import { useSearch } from '@/hooks/use-search';
import { UsersApiResponse } from '@/types/user';
import { FaUserCircle } from 'react-icons/fa';
import { RowsPerPageSelect } from '../common/RowsPerPageSelect';

function UserManagement() {
  const { search, setSearch, debouncedSearch } = useSearch({ debounceMs: 500 });

  const { page, limit, limits, setLimit, nextPage, prevPage } = usePagination({
    initialLimit: 10,
  });

  const { data: userListData, refetch } = useApiQuery<UsersApiResponse>(
    [QUERY_KEYS.USER_MANAGEMENT_QUERYKEY, debouncedSearch, String(page), String(limit)],
    API_ENDPOINTS.GET_USERS(page, debouncedSearch, limit),
  );

  const { mutate: updateUserStatus, isPending: isUpdating } = useApiMutation<
    ApiResponse<null>,
    { userId: string; status: string }
  >('patch', API_ENDPOINTS.UPDATE_USER_STATUS, {
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Update failed:', error.message);
    },
  });

  const handleUpdateStatus = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'deactive' : 'active';

    updateUserStatus({
      userId,
      status: newStatus,
    });
  };

  const total = userListData?.data?.total ?? 0;
  const currentPage = userListData?.data?.page ?? page;
  const pageSize = userListData?.data?.limit ?? limit;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="w-full">
      <div className="h-17 bg-gray-300 text-2xl items-center font-semibold flex px-5 gap-1">
        <FaUserCircle />
        <h2>User Management</h2>
      </div>
      <div className="w-370 h-35 mx-5 bg-gray-100 rounded-xl border-2 my-6 py-3">
        <h2 className="text-2xl font-semibold mx-2 ">Platform Overview</h2>
        <p className="text-base font-light my-2 mx-2">
          Administrators can search for specifc users, view their contribution history, and handle
          user reports or deactivations if necessary. <br /> This ensures community safety and helps
          maintain content integrity across the network.
        </p>
      </div>
      <div className="flex justify-between items-center mx-5 my-4">
        <div />
        <input
          type="text"
          placeholder="Search Users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-64"
        />
      </div>
      <div className="mx-5 bg-gray-100 rounded-xl border-2 mt-10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userListData?.data?.users.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleUpdateStatus(item._id, item.status)}
                    disabled={isUpdating}
                    variant={item.status.toLowerCase() === 'active' ? 'destructive' : 'default'}
                  >
                    {item.status.toLowerCase() === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end items-center gap-2 p-4">
        <RowsPerPageSelect value={limit} options={limits} onChange={setLimit} />
        <Button disabled={currentPage === 1} onClick={prevPage}>
          Previous
        </Button>

        <span className="px-3 font-medium text-base">
          Page {currentPage} of {totalPages}
        </span>
        <Button disabled={currentPage === totalPages} onClick={nextPage}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default UserManagement;
