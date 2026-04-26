"use client";

import React, { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  Package,
  Search,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  RefreshCw,
} from "lucide-react";
import { Product } from "@/types/product";
import { Modal } from "@/components/shared/Modal";
import LoadingState from "@/components/shared/Loading";
import { withRoles } from "@/components/shared/withRoles";

function ProductsPage() {
  const {
    useGetAllProducts,
    useCreateProduct,
    useUpdateProduct,
    useDeleteProduct,
  } = useProducts();
  const {
    data: products,
    isLoading,
    refetch,
    isRefetching,
  } = useGetAllProducts();

  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    image: null as File | null,
    price: 0,
    quantity: 1,
  });

  const filteredProducts = products?.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalValue =
    products?.reduce((sum, p) => sum + p.price * p.quantity, 0) ?? 0;

  const totalQuantity = products?.reduce((sum, p) => sum + p.quantity, 0) ?? 0;

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        image: null,
        price: product.price,
        quantity: product.quantity,
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: "", image: null, price: 0, quantity: 1 });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const pData = new FormData();
    pData.append("name", formData.name);
    pData.append("price", formData.price.toString());
    pData.append("quantity", formData.quantity.toString());

    if (formData.image instanceof File) {
      pData.append("image", formData.image);
    }

    if (editingProduct) {
      updateMutation.mutate(
        { id: editingProduct._id, data: pData },
        { onSuccess: () => handleCloseModal() },
      );
    } else {
      createMutation.mutate(pData, { onSuccess: () => handleCloseModal() });
    }
  };

  const handleDelete = (product: Product) => {
    setDeleteTarget(product);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget._id, {
      onSuccess: () => setDeleteTarget(null),
      onError: () => setDeleteTarget(null),
    });
  };

  if (isLoading) {
    return <LoadingState icon={Package} />;
  }

  return (
    <div className="space-y-6 pb-10" dir="rtl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <Package className="size-4 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              إدارة المنتجات
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            تصفح وأدِر منتجاتك بكل سهولة وكفاءة.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* زرار الـ Refresh اليدوي */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => refetch()}
            disabled={isRefetching}
            className="rounded-xl border-border hover:bg-muted"
          >
            <RefreshCw
              className={`size-4 ${isRefetching ? "animate-spin" : ""}`}
            />
          </Button>

          <Button
            onClick={() => handleOpenModal()}
            className="gap-2 h-10 px-5 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200 hover:-translate-y-px"
          >
            <Plus className="size-4" />
            إضافة منتج
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-card rounded-2xl border border-border p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 shrink-0">
            <ShoppingBag className="size-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">إجمالي المنتجات</p>
            <p className="text-2xl font-bold text-foreground">
              {products?.length ?? 0}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-card rounded-2xl border border-border p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 shrink-0">
            <DollarSign className="size-6 text-emerald-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">القيمة الإجمالية</p>
            <p className="text-2xl font-bold text-foreground">
              ${totalValue.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-card rounded-2xl border border-border p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-violet-500/10 shrink-0">
            <TrendingUp className="size-6 text-violet-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">إجمالي الكميات</p>
            <p className="text-2xl font-bold text-foreground">
              {totalQuantity}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      {products && products.length > 0 && (
        <div className="relative max-w-sm">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pr-10 pl-4 text-sm bg-white dark:bg-card border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
            dir="rtl"
          />
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts && filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="group bg-white dark:bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-muted/40 flex items-center justify-center overflow-hidden rounded-t-2xl">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Package className="size-12 text-primary/20" />
                    <span className="text-xs text-muted-foreground">
                      لا توجد صورة
                    </span>
                  </div>
                )}
                {/* Price badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                    ${product.price}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-base text-foreground truncate mb-1">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-400 inline-block" />
                    الكمية: {product.quantity}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-auto flex items-center gap-2 border-t border-border pt-3">
                  <button
                    onClick={() => handleOpenModal(product)}
                    className="flex-1 flex items-center justify-center gap-1.5 h-8 text-xs font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Edit className="size-3.5" />
                    تعديل
                  </button>
                  <div className="w-px h-5 bg-border" />
                  <button
                    onClick={() => handleDelete(product)}
                    disabled={deleteMutation.isPending}
                    className="flex-1 flex items-center justify-center gap-1.5 h-8 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="size-3.5" />
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-card rounded-2xl border border-dashed border-border">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Package className="size-10 text-primary/50" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {searchTerm ? "لا توجد نتائج" : "لا توجد منتجات"}
          </h3>
          <p className="text-sm text-muted-foreground text-center mb-6 max-w-xs">
            {searchTerm
              ? `لم يتم العثور على منتج باسم "${searchTerm}"`
              : "قم بإضافة أول منتج لتتمكن من إدارته هنا."}
          </p>
          {!searchTerm && (
            <Button
              onClick={() => handleOpenModal()}
              className="gap-2 shadow-lg shadow-primary/20"
            >
              <Plus className="size-4" />
              إضافة أول منتج
            </Button>
          )}
        </div>
      )}

      {/* Product Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-5" dir="rtl">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">
              اسم المنتج <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full h-10 px-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/30 focus:border-primary/50 outline-none transition-all text-sm text-foreground placeholder:text-muted-foreground"
              placeholder="مثال: بيبسي"
            />
          </div>

          {/* Price & Quantity row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                السعر ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full h-10 px-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/30 focus:border-primary/50 outline-none transition-all text-sm text-foreground text-left"
                dir="ltr"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                الكمية
              </label>
              <input
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quantity: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full h-10 px-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/30 focus:border-primary/50 outline-none transition-all text-sm text-foreground text-left"
                dir="ltr"
              />
            </div>
          </div>

          {/* Image upload */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">
              صورة المنتج (اختياري)
            </label>
            <div className="relative">
              <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group">
                <div className="flex flex-col items-center gap-2">
                  <Package className="size-7 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    {formData.image
                      ? (formData.image as File).name
                      : "انقر لاختيار صورة"}
                  </span>
                  {formData.image && (
                    <span className="text-xs text-emerald-500 font-medium">
                      تم اختيار الملف ✓
                    </span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.files?.[0] || null,
                    })
                  }
                />
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseModal}
              disabled={createMutation.isPending || updateMutation.isPending}
              className="flex-1"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="flex-1 shadow-lg shadow-primary/25"
            >
              {createMutation.isPending || updateMutation.isPending
                ? "جاري الحفظ..."
                : editingProduct
                  ? "حفظ التعديلات"
                  : "إضافة المنتج"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="تأكيد الحذف"
        maxWidth="sm"
      >
        <div className="space-y-5" dir="rtl">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/20">
              <Trash2 className="size-8 text-red-500" />
            </div>
          </div>

          {/* Message */}
          <div className="text-center space-y-2">
            <p className="text-base font-semibold text-foreground">
              هل أنت متأكد من حذف هذا المنتج؟
            </p>
            {deleteTarget && (
              <p className="text-sm text-muted-foreground">
                سيتم حذف{" "}
                <span className="font-semibold text-foreground">
                  &quot;{deleteTarget.name}&quot;
                </span>{" "}
                بشكل نهائي ولا يمكن التراجع عن هذه العملية.
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              disabled={deleteMutation.isPending}
              className="flex-1"
            >
              إلغاء
            </Button>
            <Button
              type="button"
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25 border-0"
            >
              {deleteMutation.isPending ? "جاري الحذف..." : "نعم، احذف"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default withRoles("products")(ProductsPage);
