<?php

namespace App\Http\Controllers\Base;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class BaseCrudController extends Controller
{

    protected string $model = '';
    protected string $resource = '';
    protected ?string $listResource = null;
    protected array $withList = [];
    protected array $withShow = [];
    protected string $storeRequest = '';
    protected string $updateRequest = '';
    protected array $fields = [];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = $this->model::query();
        $perPage = $request->rowsPerPage ?? 50;
        if (method_exists($this->model, 'initializer')) {
            $query = $this->model::initializer();
        }

        if (count($this->withList) > 0) {
            $query = $query->with($this->withList);
        }

        $search = $request->get('query');
        $query->when($search, function ($query) use ($search) {
            $query->where('name', 'like', "%{$search}%");
        });

        $query->orderBy('created_at', 'desc');

        $resource = $this->listResource ?? $this->resource;
        if ($perPage == 0) {
            $result = $resource::collection($query->get());

            return $this->successResponse($result, 'Success');
        }

        $data = $query->paginate($perPage);
        $result = [
            'data' => $resource::collection($data),
            'pagination' => [
                'page' => $data->currentPage(),
                'rowsPerPage' => $data->perPage(),
                'rowsNumber' => $data->total()
            ],
        ];
        return $this->successResponse($result, 'Success');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($this->storeRequest) {
            $request = app($this->storeRequest);
            $request->validated();
        }
        $modelInstance = new $this->model();
        $fields = count($this->fields) > 0 ? $this->fields : $modelInstance->getFillable();
        $data = $request->only($fields);

        try {
            $result = $this->model::create($data);
            if (method_exists($modelInstance, 'afterStore')) {
                $result->afterStore();
            }
            return response(new $this->resource($result), 201);
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        try {
            $query = $this->model::query();
            if (count($this->withShow) > 0) {
                $query = $query->with($this->withShow);
            }
            $result = $query->find($id);
            return response(new $this->resource($result), 200);
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param String $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if (empty($this->updateRequest) || empty($this->storeRequest)) {
            $format = app($this->updateRequest != '' ? $this->updateRequest : $this->storeRequest);
            $request = $format::createFrom($request);
        }
        $modelInstance = $this->model::find($id);
        $fields = count($this->fields) > 0 ? $this->fields : $modelInstance->getFillable();
        $data = $request->only($fields);
        try {
            $result = tap($modelInstance)->update($data);
            if (method_exists($modelInstance, 'afterUpdate')) {
                $modelInstance->afterUpdate();
            }
            return response(new $this->resource($result), 200);
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $modelInstance = $this->model::find($id);
        try {
            $modelInstance->delete();
            if (method_exists($modelInstance, 'afterDelete')) {
                $modelInstance->afterDelete();
            }
            return response(['message' => 'Successfully Deleted'], 200);
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    protected function successResponse($data, $message, $code = 200)
    {
        $result = [
            'data' => $data,
            'message' => $message
        ];

        if (isset($data['pagination'])) {
            $result = [
                'data' => $data['data'],
                'pagination' => $data['pagination'],
                'message' => $message,
            ];
        }
        return response()->json($result, $code);
    }

    protected function errorResponse($data, $message, $code = 400)
    {
        $result = [
            'data' => $data,
            'message' => $message,
        ];

        return response()->json($result, $code);
    }
}
