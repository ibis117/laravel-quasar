<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Base\BaseCrudController;
use App\Http\Requests\BrandStoreRequest;
use App\Http\Resources\BrandResource;
use App\Models\Brand;

class BrandsController extends BaseCrudController
{
    protected string $model = Brand::class;
    protected string $resource = BrandResource::class;
    protected string $storeRequest = BrandStoreRequest::class;

}
