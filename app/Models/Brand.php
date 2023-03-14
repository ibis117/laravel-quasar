<?php

namespace App\Models;

use Database\Factories\BrandFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PHPUnit\Exception;
use Plank\Mediable\Facades\MediaUploader;
use Plank\Mediable\Mediable;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class Brand extends Model
{
    use HasFactory, Mediable;

    protected $fillable = [
        'name',
        'description',
        'image'
    ];

    protected static function newFactory()
    {
        return BrandFactory::new();
    }

    public function setImageAttribute($value)
    {
        try {
            $media = MediaUploader::fromSource($value)
                ->toDirectory('brands')->useHashForFilename()
                ->upload();
            $this->syncMedia($media, 'image');
        } catch (Exception $exception) {
            throw new BadRequestHttpException('Unable to upload image');
        }
    }
}
